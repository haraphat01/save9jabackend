import { ObjectId } from 'mongodb';

export const subscriptionSchema = {
  name: String,
  price: Number,
  duration: String, // 'monthly' or 'yearly'
  features: Array, // Array of feature strings
  status: String, // 'active' or 'inactive'
  createdAt: Date,
  updatedAt: Date
};

export async function createSubscription(db, subscriptionData) {
  const collection = db.collection('subscriptions');
  const subscription = {
    _id: new ObjectId(),
    ...subscriptionData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await collection.insertOne(subscription);
  return subscription;
}

export async function getActiveSubscriptions(db) {
  const collection = db.collection('subscriptions');
  return collection.find({ status: 'active' }).toArray();
}

export async function getSubscriptionById(db, id) {
  const collection = db.collection('subscriptions');
  return collection.findOne({ _id: new ObjectId(id) });
} 