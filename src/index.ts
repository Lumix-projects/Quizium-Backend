import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import quizRoutes from './routes/quizzesRoutes';
import resultsRoutes from './routes/resultsRoutes';

const app = express();
const PORT = 5000;

// ✅ فعّل CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// ✅ علشان السيرفر يفهم JSON
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/quizzes', quizRoutes);
app.use('/results', resultsRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Quizium API is running ✅');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
