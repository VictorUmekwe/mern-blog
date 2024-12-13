import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { userRoutes } from "./routes/userRoutes.js";
import { authRoute } from "./routes/authRoute.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoute)

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    
  }
};

startServer();