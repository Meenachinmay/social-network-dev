const express = require('express');

const router = express.Router();

const gravatar = require('gravatar');

const bcrypt = require('bcryptjs');

// Load user model
const User = require('../../models/User');

// @route GET api/users/test
// @desc  Tests users route
// @access Private
router.get('/test', (req, res) => res.status(200).json({msg: "Users works"}));

// @route GET api/users/register
// @desc  Register a user
// @access Publie
router.post('/register', (req, res) => {
    User.findOne({email: req.body.email })
        .then(user => {
            if (user){
                return res.status(400).json({
                    email: 'Email already exists'
                })
            }else{
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm',
                });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });

                // Encrypting the UserPassword
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash
                        newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                    })
                })
            }
        });
});


// @route GET api/users/login
// @desc  Login a user
// @access Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // find by email
    User.findOne({email})
        .then(user => {
            // check for user
            if (!user){
                return res.status(404).json({
                    email: 'User email not found.'
                })
            }

            // check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch){
                        return res.json({msg: 'Success'})
                    }else{
                        return res.status(400).json({password: 'Password is not matched to our database.'})
                    }
                })
        });
})

module.exports = router;