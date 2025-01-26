import { Router, Request } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import Joi from "joi";
import jwt from "jsonwebtoken";

const router = Router();

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

router.post("/register", async (req: Request, res: any) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, password } = value;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', {
      expiresIn: "1h",
    });
    res.status(201).json({ message: "User registered successfully.", token });
  } catch (err) {
    res.status(500).json({ error: "Error registering user", details: err });
  }
});

export default router;
