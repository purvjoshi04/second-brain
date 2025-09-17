import { Router } from "express";
import dotenv from "dotenv";
import z from "zod"
import jwt from "jsonwebtoken";
import { UserModel } from "../db.js";
import bcrypt from "bcrypt";
import { userMiddleware } from "../middleware.js";


dotenv.config({ path: "../.env" })

const userRouter = Router();

userRouter.post('/api/v1/signup', async (req, res) => {
    const requiredBody = z.object({
        username: z.string(),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .max(20, { message: "Password must be at most 20 characters long" })
            .refine((password) => /[A-Z]/.test(password), {
                message: "Password must contain at least one uppercase letter",
            })
            .refine((password) => /[a-z]/.test(password), {
                message: "Password must contain at least one lowercase letter",
            })
            .refine((password) => /[0-9]/.test(password), {
                message: "Password must contain at least one number",
            })
            .refine((password) => /[!@#$%^&*]/.test(password), {
                message: "Password must contain at least one special character",
            }),
    });
    const parsed = requiredBody.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: parsed.error.flatten().fieldErrors,
        });
    }
    const userData = parsed.data;

    try {
        const userExisted = await UserModel.findOne({ username: userData.username })
        if (userExisted) {
            return res.status(409).json({
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(userData.password, 5);

        await UserModel.create({
            username: userData.username,
            password: hashedPassword
        })

        return res.status(201).json({
            message: "You are signed up!"
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            message: "Something went wrong during signup"
        });
    }
});

userRouter.post('/api/v1/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({
            username: username
        });

        if (!user) {
            return res.status(403).json({
                message: "User does not exist in our DB."
            })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        const secret = process.env.JWT_USER_SECRET;

        if (!secret) {
            throw new Error("JWT_USER_SECRET environment variable is not defined");
        }
        if (passwordCompare) {
            const authHeader = jwt.sign({ id: user._id.toString() }, secret);
            res.json({
                token: authHeader
            })
        } else {
            res.status(403).json({
                message: "Wrong credentials"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong during login "
        })
    }
})

userRouter.get('/api/v1/content', (req, res) => {

})

userRouter.delete('/api/v1/content', (req, res) => {

})

userRouter.post('/api/v1/brain/share', (req, res) => {

})

userRouter.get('/api/v1/brain/:shareLink', (req, res) => {

})


export {
    userRouter
}