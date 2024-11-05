import express from 'express'
import userRoutes from './Routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from "dotenv";
import connectDB from './Config/DBConfig.js'
import itemRoutes from './Routes/itemRoutes.js'
dotenv.config();

const app = express()
const port = process.env.PORT || 3000;
connectDB();



app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', // Ensure this matches your client URL
    // origin: 'https://mrufinder.netlify.app', 
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  }));


app.use('/api/v1/user', userRoutes)
app.use('/api/v1/item', itemRoutes)

app.listen(port, () => console.log('Server running on port 3000'))