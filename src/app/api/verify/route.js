import bcrypt from 'bcrypt';
import getDb from '@/lib/db';

export const POST = async (req) => {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return new Response(
        JSON.stringify({ error: 'Email and OTP are required.' }), 
        { status: 400 }
      );
    }

    const db = await getDb();
    const users = db.collection('users');
    const otpCollection = db.collection('otp_verifications');

    // Find user by email
    const user = await users.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found.' }), 
        { status: 404 }
      );
    }

    // Find the latest unused OTP for this user
    const otpRecord = await otpCollection.findOne({
      userId: user._id,
      used: false,
      expiresAt: { $gt: new Date() }
    }, {
      sort: { expiresAt: -1 }  // Get the most recent OTP
    });

    if (!otpRecord) {
      return new Response(
        JSON.stringify({ error: 'OTP expired or not found.' }), 
        { status: 400 }
      );
    }

    // Verify OTP
    const isValidOTP = await bcrypt.compare(otp, otpRecord.otpHash);
    if (!isValidOTP) {
      return new Response(
        JSON.stringify({ error: 'Invalid OTP.' }), 
        { status: 400 }
      );
    }

    // Mark OTP as used
    await otpCollection.updateOne(
      { _id: otpRecord._id },
      { $set: { used: true } }
    );

    // Update user verification status
    await users.updateOne(
      { _id: user._id },
      { $set: { emailVerified: true } }
    );

    return new Response(
      JSON.stringify({ message: 'Email verified successfully.' }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error during email verification:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error.' }), 
      { status: 500 }
    );
  }
};