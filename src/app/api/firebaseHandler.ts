// src/pages/api/firebaseHandler.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { updateUserStats, getUserStats } from '@/helpers/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fid, outcome } = req.body; // Expecting fid and outcome in the request body
    try {
      await updateUserStats(fid, outcome);
      res.status(200).json({ message: 'User stats updated successfully' });
    } catch (error) {
      console.error('Error updating user stats:', error);
      res.status(500).json({ error: 'Error updating user stats' });
    }
  } else if (req.method === 'GET') {
    const { fid } = req.query; // Expecting fid in the query parameters
    try {
      const stats = await getUserStats(fid as string);
      res.status(200).json(stats);
    } catch (error) {
      console.error('Error fetching user stats:', error);
      res.status(500).json({ error: 'Error fetching user stats' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
