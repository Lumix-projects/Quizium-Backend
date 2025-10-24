import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import quizRoutes from './routes/quizzesRoutes.js';
import resultsRoutes from './routes/resultsRoutes.js';

const app = express();

// ✅ فعّل CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// ✅ علشان السيرفر يفهم JSON
app.use(express.json());

// ✅ Routes
app.use('/users', userRoutes);
app.use('/quizzes', quizRoutes);
app.use('/results', resultsRoutes);

// ✅ Default route
app.get('/', (req, res) => {
  res.send('Quizium API is running ✅');
});

// ❌ متستخدمش app.listen في Vercel
// ✅ صدّر الـ app بدلاً من تشغيل السيرفر
export default app;
