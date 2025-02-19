import bcrypt from 'bcrypt';
import getDb from '@/lib/db';
import {sendEmail}  from '@/lib/email';

export const POST = async (req) => {
  try {
    const { firstName, lastName, email, phone, password } = await req.json();

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
    const otpCollection = db.collection('otp_verifications');

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists.' }), { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Save user to DB (unverified)
    const newUser = {
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      emailVerified: false,
      createdAt: new Date(),
    };
    const result = await users.insertOne(newUser);

    // Save OTP to DB
    await otpCollection.insertOne({
      userId: result.insertedId,
      otpHash,
      expiresAt: otpExpiresAt,
      used: false,
    });

    // Send OTP email
    try { // Wrap sendEmail in a try/catch for more robust error handling
      await sendEmail(email, otp);  // Corrected: Pass email and OTP separately
    } catch (emailError) {
      console.error("Error sending email from route.js:", emailError);
      return new Response(JSON.stringify({ error: 'Failed to send OTP email.' }), { status: 500 });
    }

    return new Response(
      JSON.stringify({ message: 'OTP sent to your email.' }),
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 });
  }
};