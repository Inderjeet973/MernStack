const Users = require('../models/usermodel');

const bcrypt = require('bcryptjs')

const { OAuth2Client } = require("google-auth-library");

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

// const update = async (req, res) => {

//     try {
//         const { email, password, name } = req.body;
//         const updateData = {}

//         if (email) {
//             update.Data.email = email;
//         }
//         if (password) {
//             update.Data.password = password;
//         }
//         if (name) {
//             update.Data.name = name;
//         }

//         const user = await Users.findByIdAndUpdate(
//             req.user.id,
//             updateData,
//             { new: true }
//         );

//         res.status(200).json({
//             success: true,
//             message: 'Updated Successfully',
//             user
//         })
//     }
//     catch (err) {
//         res.status(400).json({
//             succesds:false,
//             error:err.message,
//         });
//     }

// };

const update = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const updateData = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await Users.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            user,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const googleLogin = async (req, res) => {

//     const { credential } = req.body;

//     const ticket = await client.verifyIdToken({
//         idToken: credential,
//         audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();

//     console.log(payload);

// }

// const googleLogin = async (req, res) => {
//   try {
//     const { credential } = req.body;

//     const ticket = await client.verifyIdToken({
//       idToken: credential,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();

//     console.log(payload);

//     res.json({
//       success: true,
//       payload,
//     });

//   } catch (err) {
//     console.log(err);

//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };


const googleLogin = async (req, res) => {
    try {
        // get google credentials
        const { credential } = req.body;
        // 
        // console.log('credential :', credential)
        // Decode token without verifying
        const decoded = jwt.decode(credential);

        // // 
        // console.log('decoded is:', decoded)

        // console.log("Audience in Token:", decoded.aud);
        // console.log("Backend GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

        // verify google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        // console.log('ticket:', ticket)

        const payload = ticket.getPayload();

        /*
            payload = {
                name,
                email,
                picture,
                sub,
                ...
            }
        */
        // console.log('payload:', payload)
        // console.log(payload);
        let user = await Users.findOne({
            email: payload.email
        })

        if (!user) {

            user = await Users.create({

                name: payload.name,

                email: payload.email,

                googleId: payload.sub,

                picture: payload.picture,

            });

        }

        const token = jwt.sign({
            id: user._id,
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            });

        res.status(200).json({
            success: true,
            payload,
            token,
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


module.exports = {
    register,
    login,
    googleLogin,
    update,
};