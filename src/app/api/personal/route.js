import jwt from 'jsonwebtoken';
import getDb from '@/lib/db';
import { ObjectId } from 'mongodb';

const SECRET_KEY = process.env.JWT_SECRET;

export async function GET(req) {
  const authToken = req.headers.get('Authorization')?.split(' ')[1];
  if (!authToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized: No token provided' }), { status: 401 });
  }

  try {
    // Verify user authentication
    const decoded = jwt.verify(authToken, SECRET_KEY);
    const userId = decoded.userId;

    // Connect to MongoDB
    const db = await getDb();
    const users = db.collection('users');

    // Convert string ID to ObjectId
    let user;
    try {
      user = await users.findOne(
        { _id: new ObjectId(userId) },
        { projection: { password: 0 } } // Exclude password from the response
      );
    } catch (idError) {
      console.error('Error converting userId to ObjectId:', idError);
      return new Response(JSON.stringify({ error: 'Invalid user ID format' }), { status: 400 });
    }

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Return user information
    return new Response(
      JSON.stringify({
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt
        }
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error fetching user data:', error);
    if (error.name === 'JsonWebTokenError') {
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid token' }), { status: 401 });
    }
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
} 