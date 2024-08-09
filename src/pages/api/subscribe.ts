import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({ error: "Email and username are required" });
    }

    try {
      const client = await clientPromise;
      const db = client.db();

      /**
       * Email is the subscriber email
       * Username is the twitter creator username
       */
      const result = await db.collection("subscriptions").insertOne({
        email,
        username,
        createdAt: new Date(),
      });

      console.log(`New subscription added: ${result.insertedId}`);

      await fetch("http://localhost:3000/api/send-newsletters", {
        method: "POST",
        body: JSON.stringify({ username }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      res.status(201).json({ message: "Subscription added successfully" });
    } catch (error) {
      console.error("Error adding subscription:", error);
      res.status(500).json({ error: "Error adding subscription" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
