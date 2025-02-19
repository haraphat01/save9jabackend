import jwt from 'jsonwebtoken';
import getDb from '@/lib/db';
import { ObjectId } from 'mongodb';
const SECRET_KEY = process.env.JWT_SECRET;

// POST: Add a contact
export async function POST(req) {
  const db = await getDb();
  const contacts = db.collection('contacts');  // Get the contacts collection

  const authToken = req.headers.get('Authorization')?.split(' ')[1];
  if (!authToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized: No token provided' }), { status: 401 });
  }

  let userId;
  try {
    const decoded = jwt.verify(authToken, SECRET_KEY);
    userId = decoded.userId;  // Changed from id to userId to match login route
  } catch (error) {
    console.error('Error verifying token:', error);
    return new Response(JSON.stringify({ error: 'Unauthorized: Invalid token' }), { status: 401 });
  }

  const { name, phone, email, relationship } = await req.json();

  if (!name || !phone || !email || !relationship) {
    return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
  }

  try {
    // Check existing contacts count using MongoDB syntax
    const existingContacts = await contacts.find({ userId }).toArray();

    if (existingContacts.length >= 3) {
      return new Response(JSON.stringify({ error: 'You can only add up to 3 contacts' }), { status: 400 });
    }

    // Safe the contact using MongoDB syntax
    const newContact = await contacts.insertOne({
      userId,
      name,
      phone,
      email,
      relationship,
      createdAt: new Date()
    });

    return new Response(
      JSON.stringify({
        message: 'Contact added successfully',
        contact: {
          _id: newContact.insertedId,
          userId,
          name,
          phone,
          email,
          relationship
        }
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding contact:', error.message);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

// DELETE: Remove a contact
export async function DELETE(req) {
  const db = await getDb();
  const contacts = db.collection('contacts');

  const authToken = req.headers.get('Authorization')?.split(' ')[1];
  if (!authToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized: No token provided' }), { status: 401 });
  }

  let userId;
  try {
    const decoded = jwt.verify(authToken, SECRET_KEY);
    userId = decoded.userId;
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Invalid token' }), { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ error: 'Contact ID is required' }), { status: 400 });
  }

  try {
    // Find and delete the contact using MongoDB syntax
    const result = await contacts.deleteOne({
      _id: new ObjectId(id),
      userId
    });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: 'Contact not found or unauthorized' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Contact deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting contact:', error.message);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

export async function GET(req) {
  const db = await getDb();
  const contacts = db.collection('contacts');

  const authToken = req.headers.get('Authorization')?.split(' ')[1];
  if (!authToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized: No token provided' }), { status: 401 });
  }

  let userId;
  try {
    const decoded = jwt.verify(authToken, SECRET_KEY);
    userId = decoded.userId;
  } catch (error) {
    console.error('Error verifying token:', error);
    return new Response(JSON.stringify({ error: 'Unauthorized: Invalid token' }), { status: 401 });
  }

  try {
    // Fetch all contacts for the user using MongoDB syntax
    const userContacts = await contacts.find({ userId }).toArray();

    return new Response(
      JSON.stringify({
        contacts: userContacts
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}