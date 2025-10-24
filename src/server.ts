import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import usersRoutes from './routes/userRoutes';
import quizzesRoutes from './routes/quizzesRoutes';
import resultsRoutes from './routes/resultsRoutes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/users', usersRoutes);
app.use('/quizzes', quizzesRoutes);
app.use('/results', resultsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
