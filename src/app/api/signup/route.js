import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import getDb from '@/lib/db';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email'; // Resend or email service integration

export const POST = async (req) => {
  try {
    const { firstName, lastName, email, phone, password } = await req.json();

    // Input validation
    if (!firstName || !lastName || !email || !phone || !password) {
      return new Response(JSON.stringify({ error: 'All fields are required.' }), { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address.' }), { status: 400 });
    }

    if (password.length < 8) {
      return new Response(JSON.stringify({ error: 'Password must be at least 8 characters.' }), { status: 400 });
    }

    const db = await getDb();
    const users = db.collection('users');

    // Check if the user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists.' }), { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    // Save user to database
    const newUser = {
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      emailVerified: false,
      emailVerificationToken,
      createdAt: new Date(),
    };
    const result = await users.insertOne(newUser);

    // Generate JWT token for immediate use
    const token = jwt.sign(
      { userId: result.insertedId, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '10000h' }
    );

    // Send verification email
    const verificationUrl = `http://localhost:3000/api/verify?token=${emailVerificationToken}`;
    await sendEmail({
      to: email,
      subject: 'Verify Your Email Address',
      html: `<p>Hi ${firstName},</p>
             <p>Please verify your email by clicking the link below:</p>
             <p><a href="${verificationUrl}">Verify Email</a></p>
             <p>If you did not sign up, please ignore this email.</p>`,
    });
    console.log('Verification email sent to:', verificationUrl);
    return new Response(
      JSON.stringify({
        message: 'User created successfully. Please verify your email.',
        token,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error during signup:', error);
    return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 });
  }
};
