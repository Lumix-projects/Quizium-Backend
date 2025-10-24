import { Router } from 'express';
import { getAllQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz } from '../controllers/quizController';
const router = Router();

router.get('/', getAllQuizzes);
router.get('/:id', getQuizById);
router.post('/', createQuiz);
router.put('/:id', updateQuiz);
router.delete('/:id', deleteQuiz);
router.delete('/', deleteQuiz); // لحذف كل الكويزات

export default router;
