const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../models/User');

//define validation for registration inputs
const validate = [
    check('fullName').isLength({ min: 2 }).withMessage('Your full name is required'),
    check('email').isEmail().withMessage('Please provide a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Your password must beat least 6 characters')
]

router.post('/Register', validate, async (req, res) => {

    // validate data against validation rules in "validate"
    const errors = validationResult(req);

    if (!errors.isEmpty()) { //if we have an error
        return res.status(400).json({ errors: errors.array() });

    }

    //check if user already exist --> prevent duplicate email
    const userExist = await User.findOne({ email: req.body.email });
    if(userExist) return res.status(400).send('Email alredy exists');

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
        //res not includs user password token
        res.send({ id: savedUser._id, fullName: savedUser.fullName, email: savedUser.email });
    } catch (error) {
        res.status(400).send(error);
    }

});

router.post('/Login', (req, res) => {
    res.send('Login')

});

module.exports = router;