const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validations/profile');

const validateExperienceInput = require('../../validations/experience');

const validateEducationInput = require('../../validations/education');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

mongoose.set('useFindAndModify', false);

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {

  const { errors, isValid } = validateExperienceInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      // Add exp to array
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
});

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {

  const { errors, isValid } = validateEducationInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      // Add exp to array
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
});

// @route   DELETE api/profile/experience
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req, res) => {

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

      profile.experience.splice(removeIndex, 1);

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profile/education
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req, res) => {

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

      profile.education.splice(removeIndex, 1);

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profile/
// @desc    Delete profile
// @access  Private
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() => res.json({ success: true }));
  });
});


// @route   UPDATE api/profile/experience/udpate
// @desc    Update experience from profile
// @access  Private
router.put('/experience/update/:exp_id', passport.authenticate('jwt', {session: false}), (req, res) => {


  Profile.findOne({ user: req.user.id })
  .then(profile => {
    
      Profile.update({'experience._id': req.params.exp_id},{$set: 
        {
          'experience.$.title': req.body.title, 
          'experience.$.company': req.body.company,
          'experience.$.location': req.body.location,
          'experience.$.from': req.body.from,
          'experience.$.to': req.body.to,
          'experience.$.current': req.body.current,
          'experience.$.description': req.body.description,
        }},{ returnOriginal: false },
      (err, result) => {  
      if (err){
        res.status(500).json({error: 'Unable to update'});
      }else {
        res.status(200).json(profile);
      }
    });
  }).catch(err => res.json(err));


});


// @route   UPDATE api/profile/education/udpate
// @desc    Update education from profile
// @access  Private
router.put('/education/update/:edu_id', passport.authenticate('jwt', {session: false}), (req, res) => {


  Profile.findOne({ user: req.user.id })
  .then(profile => {
    
      Profile.update({'education._id': req.params.edu_id},{$set: 
        {
          'education.$.school': req.body.school, 
          'education.$.degree': req.body.degree,
          'education.$.fieldofstudy': req.body.fieldofstudy,
          'education.$.from': req.body.from,
          'education.$.to': req.body.to,
          'education.$.current': req.body.current,
          'education.$.description': req.body.description,
        }},{ returnOriginal: false },
      (err, result) => {  
      if (err){
        res.status(500).json({error: 'Unable to update'});
      }else {
        res.status(200).json(profile);
      }
    });
  }).catch(err => res.json(err));


});




// @route   UPDATE api/profile/experience/udpate
// @desc    Update experience from profile
// @access  Private
// router.post('/experience/update/:exp_id', passport.authenticate('jwt', {session: false}), (req, res) => {


//   Profile.findOne({ user: req.user.id })
//   .then(profile => {
    
//     // make a copy
//     const make_copy = profile.experience.filter(item => item.id === req.params.exp_id);

//     // getting index to delete current request
//     const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

//     // deleting the current request
//     profile.experience.splice(removeIndex, 1);

//     // creating a new object
//     const new_ = {};
    
//     make_copy.map(item => {
//       new_.title = item.title,
//       new_.from = item.from,
//       new_.description = item.description,
//       new_.to = item.to,
//       new_.company = item.company,
//       new_.current = item.current,
//       new_.location = item.location
//     });

//     if (req.body.title) new_.title = req.body.title;
//     if (req.body.company) new_.company = req.body.company;
//     if (req.body.location) new_.location = req.body.location;
//     if (req.body.from) new_.from = req.body.from;
//     if (req.body.to) new_.to = req.body.to;
//     if (req.body.current) new_.current = req.body.current;
//     if (req.body.description) new_.description = req.body.description;

//     profile.experience.unshift(new_);
//     profile.save().then(profile => res.json(profile));

//   }).catch(err => res.json(err));

// });

module.exports = router;