import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error('MongoDB URL is not defined.');
}

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Use a global cache to prevent re-creating connections in development
const globalWithMongoose = globalThis as unknown as { mongoose?: MongooseConnection };

const cached: MongooseConnection = globalWithMongoose.mongoose ?? { conn: null, promise: null };

export const connectToDatabase = async (): Promise<Mongoose> => {
    if (cached.conn) return cached.conn;

    cached.promise = cached.promise ?? mongoose.connect(MONGODB_URL, {
        dbName: 'ImageFlux',
        bufferCommands: false,
    });

    cached.conn = await cached.promise;

    // Store in global cache only in development (prevents issues with hot reloading)
    if (process.env.NODE_ENV !== 'production') {
        globalWithMongoose.mongoose = cached;
    }

    return cached.conn;
};
