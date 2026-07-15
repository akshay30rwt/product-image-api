import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'
import { AppError } from '../utils/AppError.js';

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if(existingUser) {
            throw new AppError('Email aready registered', 400);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        return res.status(201).json({
            message: 'User registered',
            user: {
                name,
                email
            }
        });
    }
    catch(error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if(!existingUser) {
            throw new AppError('Invalid email or password', 400);
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if(!isMatch) {
            throw new AppError('Invalid email or password', 400);
        }

        const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            message: 'login successful',
            token
        });
    }
    catch(error) {
        next(error);
    }
};

export { register, login };