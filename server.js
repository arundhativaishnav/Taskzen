import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDB} from './config/Mongodb.js';
import authRoutes from './routes/authRoutes.js';
import TaskRoutes from './routes/TaskRoutes.js';

dotenv.config();
const app= express();

app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/tasks', TaskRoutes);


const PORT = process.env.PORT ;


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});