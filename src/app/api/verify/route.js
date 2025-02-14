import getDb from '@/lib/db';

export const GET = async (req) => {
  try {
    const { token } = req.query;

    if (!token) {
      return new Response(JSON.stringify({ error: 'Verification token is missing.' }), { status: 400 });
    }

    const db = await getDb();
    const users = db.collection('users');

    // Find user by token
    const user = await users.findOne({ emailVerificationToken: token });
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid or expired token.' }), { status: 400 });
    }

    // Update user to mark email as verified
    await users.updateOne(
      { _id: user._id },
      { $set: { emailVerified: true }, $unset: { emailVerificationToken: '' } }
    );

    return new Response(
      JSON.stringify({ message: 'Email verified successfully.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during email verification:', error);
    return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 });
  }
};
