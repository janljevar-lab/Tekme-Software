import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/database.js';

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        await connectDB();

        app.on('error', (error) => {
            console.error('Server error!!!', error);
            process.exit(1);
        });

        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}...`);
        });

    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer();