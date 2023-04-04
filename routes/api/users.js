const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../../models/User');

router.post('/new', (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password){
    return res.status(400).json({msg: "Please enter all fields"});
  }

  User.findOne({ email })
    .then(user => {
      if(user) {
        res.status(400).json({ msg: "User already exists"})
      }
      else {
        bcrypt.genSalt(10, (err, salt) => {
          if(err) throw err;

          bcrypt.hash(password, salt, (err, hash) => {
            if(err) throw err;
  
            const new_user = new User({
              name,
              email,
              password: hash
            });
  
            new_user.save()
              .then(user => {
                jwt.sign(
                  { id: user.id },
                  'jwtSecret',
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
              });
          })
        })
      }
    })
});

module.exports = router;
