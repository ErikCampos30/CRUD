import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { title, author } = req.body;
    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: { title, author },
    });
    res.status(200).json(updatedBook);
  }

  if (req.method === "DELETE") {
    await prisma.book.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  }
}
