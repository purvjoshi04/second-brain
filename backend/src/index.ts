import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/routes.js"
import cors from "cors";


dotenv.config({path:"./.env"})

const app = express();
app.use(express.json());
app.use("/", userRouter)

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// app.use(cors())

const mongoUri = process.env.MONGODB_URL;

if (!mongoUri) {
    throw new Error("MONGO_URI not defined in environment variables.");
}

try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
} catch (error) {
    console.error("MongoDB connection error:", error);
}


app.listen(process.env.PORT)