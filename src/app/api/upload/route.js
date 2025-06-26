import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

// Replace with your MongoDB connection string
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

export async function POST(request) {
    try {
        const formData = await request.formData();

        // Get question files (should be only one)
        const questionFiles = formData.getAll("questionFiles");
        // Get answer files (can be multiple)
        const answerFiles = formData.getAll("answerFiles");

        // Basic validation
        if (
            questionFiles.length !== 1 ||
            answerFiles.length === 0 ||
            !questionFiles[0].type?.includes("pdf") ||
            !answerFiles.every(f => f.type?.includes("pdf"))
        ) {
            return NextResponse.json({ error: "Invalid files" }, { status: 400 });
        }

        // Prepare file data for MongoDB
        const questionFile = questionFiles[0];
        const questionBuffer = Buffer.from(await questionFile.arrayBuffer());
        
        const answers = [];
        for (const file of answerFiles) {
            const buffer = Buffer.from(await file.arrayBuffer());
            answers.push({
                name: file.name,
                type: file.type,
                size: file.size,
                // Store as base64 string to avoid BSON Binary issues
                data: buffer.toString('base64'),
            });
        }

        const client = await getMongoClient();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION);

        const result = await collection.insertOne({
            question: {
                name: questionFile.name,
                type: questionFile.type,
                size: questionFile.size,
                // Store as base64 string to avoid BSON Binary issues
                data: questionBuffer.toString('base64'),
            },
            answers,
            uploadedAt: new Date(),
        });

        return NextResponse.json({ success: true, id: result.insertedId });
    } catch (e) {
        console.error('Upload API Error:', e);
        return NextResponse.json({ 
            error: "Upload failed", 
            details: e.message 
        }, { status: 500 });
    }
}