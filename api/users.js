//(*3.4)
const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();
const { check, validationResult } = require('express-validator')
const { User } = require('../models');

// @route  POST api/users
// @desc   Register User
// @access public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please includes a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
], async (req, res) => {
  //check errors results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //In json format, it returns an array
    return res.status(400).json({ errors: errors.array() });
  }
  //get info from req.body(content-type: application/json)
  const { name, email, password } = req.body;

  try {
    // a. See if user exists
    let userFindByEmail = await User.findOne({ email: email });

    if (userFindByEmail) {
      //In json format, it returns an array
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // b. Get users gravatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    // c. Encrypt password
    const salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(password, salt);

    // d. Create a new user instance by User model, now user is a real object
    let user = new User({
      name: name,
      email: email,
      avatar: avatar,
      password: encryptedPassword
    });

    // e. Save the object in MongoDB Altas
    await user.save(); // Now you get the access to the user._id in MongoDB Altas.

    // f. Return json-web-token
    // Now you get the access to the user._id in MongoDB Altas.
    // 经过操作后，mongoose中使用的user.id就是MongoDB中的user._id
    const payload = {
      user: {
        id: user.id,
      }
    }
    //If you decoded the token, you can get access user._id by `req.user.id`
    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token: token })
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;