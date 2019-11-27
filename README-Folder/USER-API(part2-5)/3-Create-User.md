# MERN-Template(part 3)

## `Section: Backend`(Return user token after create a new user)

### `Summary`: In this documentation, we set up User register route(post), when a new user register, the back end can validate the info, then use the User model to create a new user, encrypted the password, then save the user info in the database, at the end of the route the app sends back a token with a user id info inside.

### `Check Dependencies`

- express
- nodemon
- mongoose
- config
- express-validator (new)
- gravatar (new)
- bcryptjs (new)
- jsonwebtoken (new)

### `Brief Contents & codes position`
- *3.1 Create. `./models/index.js`
- *3.2 Create a User model. `./models/User.js`
- *3.3 Add `jwtSecret` in `./config/default.json`
- *3.4 Create a new user post route in `./api/users.js`

### `***Important: `

- `How to add a new model? `
<ol>
<li>Add a model file in folder `models`, export the model ===> import the file in ./model/index.js, then export it.</li>
</ol>

- `What are high usage model methods?`
<ol>
<li>let obj = new modelName({...}) ===> create a new model object</li>
<li>await obj.save() ===> save the obj in database</li>
</ol>

### `Step1: Set up User model`

#### `A. Create a models folder, create a index.js file inside of it`

- This index.js file is a central clearing house for our models, so we can access all Data model through `./model/index.js`.

`(*3.1)Location: new model folder: ./models/index.js`
```js
const User = require('./User.js');
const Profile = require('./Profile.js');

module.exports = { User, Profile };
```

#### `B. Create User model.`

`(*3.2)Location: ./models/User.js`

```js
//Require dependency
const mongoose = require('mongoose');
//Create a schema, so UserSchema is a instance of mongoose Schema class
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);
```

`note:`

- In this model, we use two mongoose built-in methods.
- One is `mongoose.Schema`, which will create a Schema instance.
- The other one is `mongoose.model('user', UserSchema)`, takes two arguments, the first perameter as a collecion name in
  MongoDB Altas, the second perameter is Schema instance name.

- In the end of this file, it exports a Model.

- Create a Schema ====> Create a model ====> export the model

### `Step2: Create Post User Route`

#### `A. Install dependencies`

```bash
$ npm install express-validator --save
```

#### `B. Add post route validation`

`Location: /api/user.js`

```js
const router = require('express').Router();
const { check, validationResult } = require('express-validator');
//@route   Post api/user
//@desc    Register new user
//@access  Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more charters'
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('User route.');
  }
);

module.exports = router;
```

#### `C. Side-note: How does the route validation work?`

- In express route, there are 3 arguments, the second one is the validation one which is an option, if you have more than 1 validation, you should put them into a `[]`.
- In this case, we put validations in the second argument, and check three things:
  `req.body.name`, `req.body.email`, `req.body.password`.

##### `Why we can check these three in this way?`

##### First, we already added middleware in server.js .

```js
app.use(express.json({ extended: false }));
```

##### Second, it depends on the way we send data in Postman.

<p align="center">
<img src="../../assets/11.png" width=90%>
</p>
<p align="center">
<img src="../../assets/12.png" width=90%>
</p>

- We invoke the built-in function `validationResult(req)`, req is the argument, the function will return error if some of the `req` is not satisfy the check conditions.

- If it has error, the route will return some error message.

#### `D. Add post route response`

##### - `Install dependency`

```bash
$ npm install gravatar --save
$ npm install bcryptjs --save
```

`Location: /api/user.js`

##### - Add model, add dependencies.

```js
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
```

##### - Change the response in `async` way.

```js
async (req, res) => {
  //check errors results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //In json format, it returns an array, and stop the whole process.
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
    // Change the object attribute
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

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = router;
```

`Side-Note:`

- Validate the req.body ===> Check if the user existed ===> Get gravatar ===> Create a real object `user` by User model ===> Encrypt password ===> Save the `user` in database.

#### `E. Implementing Json-Web-Token`

##### `Add jwtSecret`

`(*3.3)Location: ./config/user.js`
```js
{
    "mongoURI":"mongodb+srv://donghao:Qs5LEDWIaPITXIIn@cluster0-qvchz.mongodb.net/test?retryWrites=true&w=majority",
    "jwtSecret":"mySecretToken"
}
```

##### `Install dependency`

```bash
$ npm install jsonwebtoken --save
```
`Location: /api/user.js`
##### - Add dependency.

```js
const jwt = require('jsonwebtoken');
const config = require('config');
// f. Return json-web-token
// Now you get the access to the user._id in MongoDB Altas.
// 经过操作后，mongoose中使用的user.id就是MongoDB中的user._id
const payload = {
    user: {
        id: user.id,
    }
}

jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
    if (err) throw err;
    res.json({ token: token })
});
```

#### `Side-Note(Chinese):`

- `payload 是一个 object，在这里的作用是把一个payload（包含用户id信息）转化成一个有时效性的token（包含用户ID信息）；`
- jwt.sign 是一个依赖中的内建函数，它有四个参数，第一个是目标对象，第二个是打包码，第三个是包裹有效时间，第四个是可选参数，是一个回调函数，对打包过程的一个反馈。
- 总的来说，jwt.sign 就是一个数据打包函数，输入数据和打包钥匙，最后生成一个有数据包信息的令牌数据(一个全新object，只有一对键值)，其实就是一个数据变形的过程。
- 要补充的是，本程序设定的是重复用户的定义是不能有相同的电子邮箱。
- 在这里有一个建议就是，最好不要把 Connection String 和 jwtSecret 上传和公开。
- 在语句`user.save();`之后， 我们就可以通过`user.id`去获得新建user在MongoDB中的`_id`。

#### `F. Final post route code`

`(*3.4)Location: /api/user.js`

```js
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
```

#### `G Test it`
- In postman
<p align="center">
<img src="../../assets/13.png" width=90%>
</p>

- In jwt.io
<p align="center">
<img src="../../assets/14.png" width=90%>
</p>

- In MongoDB Altas
<p align="center">
<img src="../../assets/15.png" width=90%>
</p>
