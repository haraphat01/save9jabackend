import jwt from 'jsonwebtoken';
import getDb from '@/lib/db';
import { createClient } from '@supabase/supabase-js';
import { Buffer } from 'buffer';
import { Resend } from 'resend';
import EmergencyEmail from '../../components/EmergencyEmail';
import React from 'react';

const SECRET_KEY = process.env.JWT_SECRET;
const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

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
            recording  // Expect base64 string instead of URI
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

        // Create emergency record
        const emergencyData = {
            userId: decoded.userId,
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

        // Fetch user's contacts from `contacts` collection
        const contacts = await contactsCollection.find({ userId: decoded.userId }).toArray();

        if (!contacts.length) {
            console.error('No emergency contacts found for user:', decoded.userId);
            return new Response(
                JSON.stringify({ error: 'No emergency contacts found' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Send email notifications to all contacts
        const emailPromises = contacts.map(contact => {
            return resend.emails.send({
                from: 'alerts@yourdomain.com',
                to: contact.email,
                subject: '🚨 Emergency Alert - Immediate Attention Required',
                react: EmergencyEmail({ emergency: emergencyData }),
            });
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
