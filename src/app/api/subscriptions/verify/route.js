import { NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserById, updateUserSubscription } from '@/lib/models/user';

export async function POST(request) {
  try {
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const user = await getUserById(db, userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // If user has free subscription, return immediately
    if (user.subscription_status === 'free') {
      return NextResponse.json({
        subscription_status: 'free',
        subscription_type: 'free',
        is_active: true
      });
    }

    // Check if subscription is expired
    const now = new Date();
    const isExpired = user.subscription_expiry && user.subscription_expiry < now;

    // Update subscription status if expired
    if (isExpired && user.subscription_status === 'active') {
      await updateUserSubscription(db, userId, {
        subscription_status: 'expired'
      });
      user.subscription_status = 'expired';
    }

    return NextResponse.json({
      subscription_status: user.subscription_status,
      subscription_type: user.subscription_type,
      subscription_expiry: user.subscription_expiry,
      is_active: user.subscription_status === 'active'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to verify subscription' },
      { status: 500 }
    );
  }
} 