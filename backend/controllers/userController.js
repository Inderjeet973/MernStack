const Users = require('../models/usermodel');

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        const userExist = await Users.findOne({ email })

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: 'User already registered',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: user,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            });
        }
        const user = await Users.findOne({ email })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Email',
            });
        }
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password',
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            success: true,
            message: 'login successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
module.exports = {
    register,
    login,
};