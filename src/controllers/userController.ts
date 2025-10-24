import { Request, Response } from 'express';
import prisma from '../prismaClient';

// إنشاء مستخدم
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({ data: { name, email, password } });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// جلب كل المستخدمين
export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

// جلب مستخدم واحد
export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

// تعديل مستخدم
export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, email, password } = req.body;
  const updated = await prisma.user.update({ where: { id }, data: { name, email, password } });
  res.json(updated);
};

// حذف مستخدم
export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.user.delete({ where: { id } });
  res.json({ message: 'User deleted' });
};
