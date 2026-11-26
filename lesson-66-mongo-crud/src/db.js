import { MongoClient } from 'mongodb';
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.MONGO_CONNECTION_STRING;

if (!connectionString) {
    console.error('MONGO_CONNECTION_STRING is not defined in the environment variables');
    process.exit(1);
}

const dbClient = new MongoClient(connectionString);
export let db;

export async function dbConnect() {
    await dbClient.connect();
    db = await dbClient.db('sample_mflix');

    await createCollections();
    console.log("Connected to MongoDB");
}

async function createCollections() {
    const neededCollections = ['persons', 'movies'];

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    await Promise.all(neededCollections.map(async (collectionName) => {
        if (!collectionNames.includes(collectionName)) {
            await db.createCollection(collectionName);
            console.log(`Collection ${collectionName} created`);
        } else {
            console.log(`Collection ${collectionName} already exists`);
        }
    }));
}