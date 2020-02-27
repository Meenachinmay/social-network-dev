const express = require('express');

const router = express.Router();


// @route GET api/users/test
// @desc  Tests users route
// @access Private
router.get('/test', (req, res) => res.status(200).json({msg: "Users works"}));

module.exports = router;