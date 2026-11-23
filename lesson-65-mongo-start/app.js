import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const connectionString = process.env.MONGO_CONNECTION_STRING;

if (!connectionString) {
    console.error('MONGO_CONNECTION_STRING is not defined in the environment variables');
    process.exit(1);
}

const dbClient = new MongoClient(connectionString);

async function connect() {
    try {
        await dbClient.connect();
        const db = await dbClient.db('sample_mflix');
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server started and listening to http://localhost:${PORT}`);
        })

    } catch (e) {
        console.error('Error connection with Database', e);
    }
}

connect();