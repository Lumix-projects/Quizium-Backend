import { Request, Response } from 'express';
import prisma from '../prismaClient';

// أي يوزر يرسل إجابات → النتيجة تتحسب تلقائي
export const submitResult = async (req: Request, res: Response) => {
  try {
    const { userId, quizId, answers } = req.body;

    // جلب الكويز مع الأسئلة
    const quiz = await prisma.quiz.findUnique({ 
      where: { id: quizId },
      include: { questions: true }
    });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    // حساب النتيجة تلقائي
    let score = 0;
    for (const q of quiz.questions) {
      const userAnswer = answers.find((a: any) => a.questionId === q.id);
      if (userAnswer && userAnswer.answer === q.answer) score += 1;
    }

    const percentage = (score / quiz.questions.length) * 100;

    // تخزين النتيجة في DB
    const result = await prisma.result.create({
      data: { userId, quizId, score: percentage },
    });

    // إرجاع النتيجة مباشرة
    res.status(201).json({ result, message: `You scored ${percentage}%` });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Error submitting result' });
  }
};

// جلب كل النتائج
export const getAllResults = async (_req: Request, res: Response) => {
  const results = await prisma.result.findMany({ include: { user: true, quiz: true } });
  res.json(results);
};

// جلب نتائج مستخدم محدد
export const getUserResults = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const results = await prisma.result.findMany({ where: { userId }, include: { quiz: true } });
  res.json(results);
};

// جلب نتائج كويز محدد
export const getQuizResults = async (req: Request, res: Response) => {
  const quizId = Number(req.params.quizId);
  const results = await prisma.result.findMany({ where: { quizId }, include: { user: true } });
  res.json(results);
};
