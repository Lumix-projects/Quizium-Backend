import { Request, Response } from 'express';
import prisma from '../prismaClient';

// جلب كل الكويزات
export const getAllQuizzes = async (_req: Request, res: Response) => {
  const quizzes = await prisma.quiz.findMany({ include: { questions: true } });
  res.json(quizzes);
};

// جلب كويز واحد
export const getQuizById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const quiz = await prisma.quiz.findUnique({ where: { id }, include: { questions: true } });
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  res.json(quiz);
};

// إنشاء كويز مع أسئلة
export const createQuiz = async (req: Request, res: Response) => {
  const { title, description, questions } = req.body;
  if (!title || !questions || !questions.length) return res.status(400).json({ error: 'Title and questions required' });

  const quiz = await prisma.quiz.create({
    data: {
      title,
      description,
      questions: { create: questions.map((q: any) => ({ text: q.text, options: q.options, answer: q.answer })) }
    },
    include: { questions: true }
  });
  res.status(201).json(quiz);
};

// تعديل كويز
export const updateQuiz = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, description } = req.body;
  const updated = await prisma.quiz.update({ where: { id }, data: { title, description }, include: { questions: true } });
  res.json(updated);
};

// حذف كويز أو كل الكويزات
export const deleteQuiz = async (req: Request, res: Response) => {
  const id = req.params.id ? Number(req.params.id) : null;

  if (id) {
    await prisma.question.deleteMany({ where: { quizId: id } });
    await prisma.quiz.delete({ where: { id } });
    return res.json({ message: 'Quiz deleted successfully' });
  }

  await prisma.question.deleteMany({});
  await prisma.quiz.deleteMany({});
  res.json({ message: 'All quizzes deleted successfully' });
};
