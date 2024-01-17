// pages/api/submitQuestion.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs-extra';
import path from 'path';

interface QuestionData {
  name: string;
  email: string;
  question: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const data: QuestionData = req.body;

      // Path to the JSON file
      const filePath = path.join(process.cwd(), 'data', 'FAQ.json');

      // Read existing data
      const fileData = await fs.readJson(filePath);

      // Append new question
      const newQuestion = {
        id: fileData.length + 1, // Increment ID
        question: data.question,
        answer: '', // Placeholder for answer
        link: null, // Placeholder for link
      };
      fileData.push(newQuestion);

      // Write updated data back to the file
      await fs.writeJson(filePath, fileData, { spaces: 2 });

      res.status(200).json({ message: 'Question submitted successfully' });
    } catch (error) {
      console.error('Error in submitQuestion API:', error);
      res.status(500).json({ message: 'Error processing request' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
