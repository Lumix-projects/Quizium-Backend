import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import usersRoutes from './routes/userRoutes.js';
import quizzesRoutes from './routes/quizzesRoutes.js';
import resultsRoutes from './routes/resultsRoutes.js';

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(bodyParser.json());

// ✅ Routes
app.use('/users', usersRoutes);
app.use('/quizzes', quizzesRoutes);
app.use('/results', resultsRoutes);

// ✅ Default route (عشان Vercel يرد بحاجة بدل 404 فاضية)
app.get('/', (req: Request, res: Response) => {
  res.send('Quizium API is running 🚀');
});

// ✅ Run server locally (Vercel بيتعامل مع Lambda function)
const PORT = process.env.PORT || 5000;

// شرط مهم: متشغّلش السيرفر في Vercel بنفسك
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ✅ Export عشان Vercel يعرف يتعامل مع Express app
export default app;
