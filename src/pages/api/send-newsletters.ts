import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const newsletters = await prisma.newsletter.findMany({
      where: { sent: false },
    });

    for (const newsletter of newsletters) {
      const user = await prisma.user.findUnique({
        where: { id: newsletter.userId },
      });
      if (user) {
        // Logic to send newsletter
      }

      await prisma.newsletter.update({
        where: { id: newsletter.id },
        data: { sent: true },
      });
    }

    res.status(200).json({ message: "Newsletters sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
