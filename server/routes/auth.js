const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
require('dotenv').config();

const User = require('../models/User');

//define validation for registration inputs
const validate = [
    check('fullName').isLength({ min: 2 }).withMessage('Your full name is required'),
    check('email').isEmail().withMessage('Please provide a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Your password must beat least 6 characters')
]
//define validation for login inputs
const loginValidation = [
    check('email').isEmail().withMessage('Please provide a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Your password must beat least 6 characters')
]
//define validation for reset password inputs
const forgotPasswordValidation = [
    check('email').isEmail().withMessage('Please provide a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Your password must beat least 6 characters')
]

const generateToken = user => {
    return jwt.sign(
        { _id: user._id, email: user.email, fullName: user.fullName }, 'SECRET1234');
}

router.post('/Register', validate, async (req, res) => {

    // validate data against validation rules in "validate"
    const errors = validationResult(req);

    if (!errors.isEmpty()) { //if we have an error
        return res.status(400).json({ errors: errors.array() });

    }

    //check if user already exist --> prevent duplicate email
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) return res.status(400).send({ success: false, message: 'Email already exists' });

    //jenerate salt to hash password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create instance of a user class    
    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashPassword
    })

    try {
        const savedUser = await user.save();
        //create and assign a token
        const token = generateToken(user);
        //res not includs user password token: we dont want to store plainText in DB
        res.send({
            success: true,
            data: {
                id: savedUser._id,
                fullName: savedUser.fullName,
                email: savedUser.email
            },
            token

        });
    } catch (error) {
        res.status(400).send({ success: false, error });
    }

});

router.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.send(users)
        })
        .catch(err => console.log(err))
});

router.post('/Login', loginValidation, async (req, res) => {

    // validate data against validation rules in "loginValidation"
    const errors = validationResult(req);
    //begor checking in DB we check if we got any user fro login form
    if (!errors.isEmpty()) { //if we have an error
        return res.status(400).json({ errors: errors.array() });

    }

    //check if email exist in system
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send({ success: false, message: 'User is not registered' });

    //check if password correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(404).send({ success: false, message: 'Invalid Email or Password' });

    //create and assign a token
    const token = generateToken(user);
    // attaching the token to the header of our response:
    res.header('auth-token', token).send({ success: true, message: 'Logged in succesfuly', token })
});

router.post('/ForgotPassword', forgotPasswordValidation, async (req, res) => {
    const errors = validationResult(req);
    //checking in DB we check if we got any user from forgot password form
    if (!errors.isEmpty()) { //if we have an error
        return res.status(400).json({ errors: errors.array() });
    }
    //check if user's email exist in system
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) {
        return res.status(400).send({ success: false, message: 'User is not registered' });
    } else {
        //jenerate salt to hash the new password
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // console.log('old');
        // console.log(userExist.password);
        // console.log('hashed');
        // console.log(hashPassword);

        //create and assign a token
        const token = generateToken(userExist);
        //find & update user's password
        User.findOneAndUpdate({ _id: userExist._id }, { password: hashPassword }, { useFindAndModify: false })
            .then(() => {
                res.status(202).send({
                    success: true, message: 'Password Changed Successfully', token
                });

            });
    }

});

module.exports = router;

