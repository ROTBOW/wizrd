User.findOne({ email: req.body.email}).then(user => {
    if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
    } else {
        User.findOne({username: req.body.username}).then(user => {
            if (user) {
                errors.username = 'Username already exists';
                return res.status(400).json(errors);
            } else {
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
        })
    }
})