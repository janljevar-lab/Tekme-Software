import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI ||
            `mongodb://${process.env.MONGO_HOST || '127.0.0.1'}:${process.env.MONGO_PORT || '27017'}/${process.env.MONGO_DB || 'test'}`;

        const connectionInstance = await mongoose.connect(mongoUri);
        console.log(`MongoDB connected!!! ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed!!!", error);
        process.exit(1);
    }
};

export default connectDB;