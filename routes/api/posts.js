const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

const validatePostInput = require('../../validations/post');

// @route GET api/posts/test
// @desc  Tests posts route
// @access Public
router.get('/test', (req, res) => res.status(200).json({msg: "Posts works"}));

// @route GET api/posts
// @desc  Get post
// @access Public
router.get('/', (req,res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostsFound: 'No Posts found with that id'}));
});

// @route GET api/posts/:id
// @desc  Get post by id
// @access Public
router.get('/:id', (req,res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({nopostFound: 'No Post found with that id'}));
});

// @route POST api/posts
// @desc  Create post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid){
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});


// @route DELETE api/posts
// @desc  Delete posts
// @access Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.user.toString() !== req.user.id){
                        return res.status(401).json({ notauthorized: 'User is not authorized'});
                    }

                    post.remove().then(() => res.json({ success: true })).catch(err => res.json(err));
                }).catch(err => res.status(404).json({ postnotfound: 'Post not found'}));
        }).catch(err => res.status(401).json({ noprofileFound: 'No profile found'}));
});


// @route POST api/posts/like/:id
// @desc  Like posts
// @access Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                        return res.status(400).json({ alreadyLiked: 'User liked this post'});
                    }

                    post.likes.unshift({ user: req.user.id });

                    post.save().then(post => res.json({msg: 'Liked', post: post})).catch(err => res.json(err));

                }).catch(err => res.status(404).json({ postnotfound: 'Post not found'}));
        }).catch(err => res.status(401).json({ noprofileFound: 'No profile found'}));
});


// @route POST api/posts/unlike/:id
// @desc  Dislike posts
// @access Private
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                        return res.status(400).json({ notLiked: 'You have not yet liked this post'});
                    }

                    removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

                    post.likes.splice(removeIndex, 1);

                    post.save().then(post => res.json({msg: 'Unliked', post: post})).catch(err => res.json(err));

                }).catch(err => res.status(404).json({ postnotfound: 'Post not found'}));
        }).catch(err => res.status(401).json({ noprofileFound: 'No profile found'}));
});

module.exports = router;