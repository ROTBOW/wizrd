const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check to make sure nobody has already registered with a duplicate email
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      // Use the validations to send the error
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      // Otherwise create a new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          let password = newUser.password;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = { id: user.id, username: user.username };
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 14400 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token,
                  });
                }
              );
            })
            .then(() => {
              return res.status(200).json({
              usernameOrEmail: newUser.email,
              password: password
              })
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const usernameOrEmail = req.body.usernameOrEmail;
  const password = req.body.password;
  
  let queryField;
  if (usernameOrEmail.includes('@')) {
    queryField = 'email';
  } else {
    queryField = 'username'
  }
  console.log(req.body);
  User.findOne({ [queryField]: usernameOrEmail }).then((user) => {
    if (!user) {
      // Use the validations to send the error
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, username: user.username, email: user.email, avatar: user.avatar };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 14400 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          }
        );
      } else {
        return res.status(400).json({ password: 'Incorrect password' });
      }
    });
  });
});

router.get('/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      avatar: req.user.avatar
    });
  }
);

module.exports = router;
