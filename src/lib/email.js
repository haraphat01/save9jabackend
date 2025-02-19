// email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email, otp) => {  // Added 'export' here
  try {
    const data = await resend.emails.send({
      from: 'Safe9ja <no-reply@safe9ja.com>',
      to: email,
      subject: 'Your OTP Code',
      html: `<h1>Welcome, here is your OTP: <strong>${otp}</strong>! Use this to verify your account.</h1>`,
    });

    console.log(`OTP email sent to ${email}`);
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
};