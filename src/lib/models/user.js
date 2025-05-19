import { ObjectId } from 'mongodb';

export const userSchema = {
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  password: String,
  emailVerified: Boolean,
  subscription_status: String, // 'free', 'active', 'expired'
  subscription_type: String, // 'free', 'basic', 'premium', etc.
  subscription_expiry: Date,
  subscription_id: ObjectId,
  createdAt: Date,
  updatedAt: Date
};

export async function createUser(db, userData) {
  const collection = db.collection('users');
  const user = {
    _id: new ObjectId(),
    ...userData,
    emailVerified: false,
    subscription_status: 'free',
    subscription_type: 'free',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await collection.insertOne(user);
  return user;
}

export async function updateUserSubscription(db, userId, subscriptionData) {
  const collection = db.collection('users');
  const update = {
    $set: {
      ...subscriptionData,
      updatedAt: new Date()
    }
  };
  return collection.findOneAndUpdate(
    { _id: new ObjectId(userId) },
    update,
    { returnDocument: 'after' }
  );
}

export async function getUserById(db, id) {
  const collection = db.collection('users');
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function getUserByEmail(db, email) {
  const collection = db.collection('users');
  return collection.findOne({ email });
} 