import { Router } from 'express';
import { 
  submitResult, 
  getAllResults, 
  getUserResults, 
  getQuizResults 
} from '../controllers/resultController';

const router = Router();

// 1️⃣ إرسال نتيجة كويز لأي يوزر (تتحسب تلقائي)
router.post('/', submitResult);

// 2️⃣ جلب كل النتائج
router.get('/', getAllResults);

// 3️⃣ جلب نتائج مستخدم محدد
router.get('/user/:userId', getUserResults);

// 4️⃣ (اختياري) جلب نتائج كويز معين
router.get('/quiz/:quizId', getQuizResults);

export default router;
