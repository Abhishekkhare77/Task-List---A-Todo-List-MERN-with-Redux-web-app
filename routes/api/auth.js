const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');

const router = express.Router();

const User = require('../../models/User');

// @route POST api/auth
// @desc Authenticates the user
// @access Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  if(!email || !password){
    return res.status(400).json({msg: "Please enter both an email and a password"});
  }

  User.findOne({ email })
    .then(user => {
      if(!user) {
        res.status(400).json({ msg: "User does not exist"})
      }

      bcrypt.compare(password, user.password)
        .then(matching => {
          if(!matching){
            res.status(400).json({msg: "Invalid credentials"})
          }
          else{
            jwt.sign(
              { id: user.id },
              'jwtsecret',
              { expiresIn: 3600 },
              (err, token) => {
                if(err){
                  throw err;
                }
                res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                  }
                });
              }
            );
          }
        })
    })
});

// @route GET api/auth/user
// @desc GETs user data
// @access Private
router.get('/user', auth, (req, res) => {
  // auth middleware adds user id to req
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
})

module.exports = router;
