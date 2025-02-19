// route.js

import jwt from 'jsonwebtoken';
import getDb from '@/lib/db';
import { createClient } from '@supabase/supabase-js';
import { Buffer } from 'buffer';
import { Resend } from 'resend'; 
import { sendEmergencyEmail } from '../../components/EmergencyEmail'; // Import the email sending function

const SECRET_KEY = process.env.JWT_SECRET;

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY); // Initialize Resend with API key

export async function POST(req) {
    const authToken = req.headers.get('Authorization')?.split(' ')[1];
    if (!authToken) {
        return new Response('Authorization token is required', { status: 401 });
    }

    try {
        // Verify user authentication
        const decoded = jwt.verify(authToken, SECRET_KEY);
        console.log('Decoded Token:', decoded);

        // Parse request body
        const body = await req.json();
        console.log('Received Data:', body);

        const {
            location,
            address,
            batteryLevel,
            networkInfo,
            fallDetected,
            altitudeChange,
            impactDetected,
            recording
        } = body;

        // Convert base64 to buffer
        const audioBuffer = Buffer.from(recording, 'base64');

        // Generate unique filename
        const timestamp = new Date().getTime();
        const filename = `${decoded.userId}/${timestamp}.m4a`;

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('emergency-recordings')
            .upload(filename, audioBuffer, {
                contentType: 'audio/m4a',
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            console.error('Upload Error:', uploadError);
            throw new Error('Failed to upload audio file');
        }

        // Get public URL for the uploaded file
        const { data: { publicUrl } } = supabase.storage
            .from('emergency-recordings')
            .getPublicUrl(filename);

        // Connect to MongoDB
        const db = await getDb();
        const emergencyCollection = db.collection('emergencies');
        const contactsCollection = db.collection('contacts');
        const usersCollection = db.collection('users');

        // Fetch user details to get the name
        const user = await usersCollection.findOne({ _id: decoded.userId });
        
        // Define userName - use a default if user not found
        const userName = user?.name || 'Unknown User';
        console.log('User found:', !!user, 'Name:', userName);

        // Create emergency record
        const emergencyData = {
            userId: decoded.userId,
            userName: userName,
            timestamp: new Date(),
            location: {
                latitude: location.latitude,
                longitude: location.longitude
            },
            address,
            batteryLevel,
            networkInfo: {
                isInternetReachable: networkInfo.isInternetReachable,
                type: networkInfo.type,
                isConnected: networkInfo.isConnected
            },
            fallDetected,
            altitudeChange,
            impactDetected,
            recordingUri: publicUrl,
            status: 'active'
        };

        // Insert into database
        const result = await emergencyCollection.insertOne(emergencyData);

        // Fetch user's contacts
        const contacts = await contactsCollection.find({ userId: decoded.userId }).toArray();

        if (!contacts.length) {
            console.error('No emergency contacts found for user:', decoded.userId);
            return new Response(
                JSON.stringify({ 
                    error: 'No emergency contacts found',
                    emergencyId: result.insertedId,
                    audioUrl: publicUrl
                }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Send email notifications using the sendEmergencyEmail function
        const emailPromises = contacts.map(async (contact) => {
            try {
                const data = await sendEmergencyEmail(contact.email, emergencyData);
                console.log('Email sent to:', contact.email, 'Resend data:', data);
                return data; // Return the Resend data for tracking
            } catch (error) {
                console.error('Failed to send email to', contact.email, 'Error:', error);
                throw error; // Re-throw the error to be caught by Promise.all
            }
        });

        try {
            await Promise.all(emailPromises);
            console.log(`Emails sent successfully to: ${contacts.map(c => c.email).join(', ')}`);
        } catch (emailError) {
            console.error('Failed to send some or all emails:', emailError);
        }

        return new Response(
            JSON.stringify({
                message: 'Emergency data saved successfully',
                emergencyId: result.insertedId,
                audioUrl: publicUrl
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({
                error: 'Failed to process emergency data',
                details: error.message
            }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}