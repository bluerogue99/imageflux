import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Declare a global variable for caching the connection
declare global {
    // Define the type for `mongoose` on the global object
    var mongoose: MongooseConnection | undefined;
}

// Use `const` instead of `let` to avoid reassignment
const cached: MongooseConnection = globalThis.mongoose ?? { conn: null, promise: null };

export const connectToDatabase = async (): Promise<Mongoose> => {
    if (cached.conn) return cached.conn;

    if (!MONGODB_URL) throw new Error('MongoDB URL is not defined.');

    cached.promise = cached.promise ?? mongoose.connect(MONGODB_URL, {
        dbName: 'ImageFlux',
        bufferCommands: false
    });

    cached.conn = await cached.promise;

    // Store in global cache
    globalThis.mongoose = cached;

    return cached.conn;
};
