import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("Attempting to connect to MongoDB");
    const client = await clientPromise;
    const db = client.db("your_database_name");
    
    console.log("Connected to MongoDB, performing test query");
    const testCollection = db.collection("test");
    const result = await testCollection.insertOne({ test: "Hello MongoDB" });
    
    console.log("Test query result:", result);
    res.status(200).json({ message: "MongoDB connection successful", result });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    res.status(500).json({ error: "Failed to connect to MongoDB", details: error });
  }
}