const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route GET api/profile/test
// @desc  Tests profile route
// @access Public
router.get('/test', (req, res) => res.status(200).json({msg: "profile works"}));


// @route GET api/profile/get
// @desc  Get profile route to get a profile of user
// @access Private
router.get('/get', passport.authenticate('jwt', { session: false }), (req, res) => {

    const errors = {};

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile){
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
})


module.exports = router;