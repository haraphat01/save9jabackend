import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import getDb from '@/lib/db';
export const POST = async (req) => {
    try {
      const { email } = await req.json();
  
      if (!email) {
        return new Response(JSON.stringify({ error: 'Email is required.' }), { status: 400 });
      }
  
      
      const db = await getDb();
      const users = db.collection('users');
      const otpCollection = db.collection('otp_verifications');
  
      const user = await users.findOne({ email });
      if (!user) {
        return new Response(JSON.stringify({ error: 'User not found.' }), { status: 404 });
      }
  
      if (user.emailVerified) {
        return new Response(JSON.stringify({ error: 'Email already verified.' }), { status: 400 });
      }
  
      // Generate a new OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpHash = await bcrypt.hash(otp, 10);
      const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry
  
      // Safe new OTP in DB
      await otpCollection.insertOne({
        userId: user._id,
        otpHash,
        expiresAt: otpExpiresAt,
        used: false,
      });
  
      // Send OTP email
    //   await sendEmail({
    //     to: email,
    //     subject: 'Your New OTP Code',
    //     html: `<p>Your new OTP code is: <strong>${otp}</strong></p>
    //            <p>This code expires in 10 minutes.</p>`,
    //   });
  console.log(otp);
      return new Response(JSON.stringify({ message: 'New OTP sent to your email .' }), { status: 200 });
  
    } catch (error) {
      console.error('Resend OTP Error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 });
    }
  };
  