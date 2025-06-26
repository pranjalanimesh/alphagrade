import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = "alphagrade";
const COLLECTION = "uploads";

let cachedClient = null;
async function getMongoClient() {
    if (cachedClient) return cachedClient;
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    cachedClient = client;
    return client;
}

function bufferToBase64(data) {
    // Handle different data types that might come from MongoDB
    if (Buffer.isBuffer(data)) {
        return data.toString("base64");
    }
    
    // Handle BSON Binary type
    if (data && data.buffer) {
        return Buffer.from(data.buffer).toString("base64");
    }
    
    // Handle Uint8Array
    if (data && data.constructor === Uint8Array) {
        return Buffer.from(data).toString("base64");
    }
    
    // If it's already a base64 string, return as is
    if (typeof data === 'string') {
        return data;
    }
    
    throw new Error('Unsupported data type for PDF conversion');
}

export async function GET() {
    try {
        const client = await getMongoClient();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION);

        // Get the latest upload
        const latest = await collection.findOne({}, { sort: { uploadedAt: -1 } });
        if (!latest) {
            return NextResponse.json({ error: "No uploads found" }, { status: 404 });
        }

        // Convert question data to base64
        const question = {
            name: latest.question.name,
            type: latest.question.type,
            size: latest.question.size,
            data: bufferToBase64(latest.question.data),
        };

        // Convert answer data to base64
        const answers = latest.answers.map(ans => ({
            name: ans.name,
            type: ans.type,
            size: ans.size,
            data: bufferToBase64(ans.data),
        }));

        return NextResponse.json({ question, answers });
    } catch (e) {
        console.error('Evaluation API Error:', e);
        return NextResponse.json({ 
            error: "Failed to fetch evaluation", 
            details: e.message 
        }, { status: 500 });
    }
}