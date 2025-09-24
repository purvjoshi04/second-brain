import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/routes.js"
import cors from "cors";


dotenv.config({ path: "./.env" })

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use("/", userRouter)


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