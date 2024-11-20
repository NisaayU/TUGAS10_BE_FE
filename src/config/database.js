import mongoose from 'mongoose';
import { mongodbUri } from './env.js';

const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};


export default connectDB;
