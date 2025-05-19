import { NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getActiveSubscriptions, getSubscriptionById } from '@/lib/models/subscription';
import { updateUserSubscription, getUserById } from '@/lib/models/user';

// Get all active subscription plans
export async function GET() {
  try {
    const db = await getDb();
    const subscriptions = await getActiveSubscriptions(db);
    return NextResponse.json({ subscriptions });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  }
}

// Process subscription purchase
export async function POST(request) {
  try {
    const { userId, subscriptionId } = await request.json();
    
    if (!userId || !subscriptionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await getDb();
    
    // Get subscription details
    const subscription = await getSubscriptionById(db, subscriptionId);
    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription plan not found' },
        { status: 404 }
      );
    }

    // Get user details
    const user = await getUserById(db, userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Calculate expiry date
    const expiryDate = new Date();
    if (subscription.duration === 'monthly') {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else if (subscription.duration === 'yearly') {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }

    // Update user subscription
    const updatedUser = await updateUserSubscription(db, userId, {
      subscription_status: 'active',
      subscription_type: subscription.name,
      subscription_expiry: expiryDate,
      subscription_id: subscription._id
    });

    return NextResponse.json({
      message: 'Subscription updated successfully',
      user: updatedUser
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
} 