import { connectToDatabase } from '../../util/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { db } = await connectToDatabase();

    const { name, email, message } = req.body;

    const result = await db.collection('formData').insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    res.status(201).json({ message: 'Form submitted successfully', data: result.ops[0] });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
