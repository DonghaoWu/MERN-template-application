# MERN-Template(part 4)
## `Section: Backend`(Return user object from token)

### `Summary`: In this documentation, we create a middleware to decode the token, then we create a auth route(get) to use this middle to get the id info from the incoming token, and return the user object at the end.

```diff
+ `重要备注：这里的id是在将数据成功存进MongoDB后自动由MongoDB生成的`
```

### `Check Dependencies`

- express
- morgan
- nodemon
- mongoose
- express-validator (new)
- gravatar (new)
- bcryptjs (new)
- jsonwebtoken (new)

### `Brief Contents & codes position`
- *4.1 Create a middleware call 'auth'. `./middleware/auth.js`
- *4.2 Create a auth routh. `./api/auth.js`

### `Step1: What do you get in the last part?`

#### `After you register a new user, you will get a token object, like this`

```js
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjoiNWQ0ODQwMTBlOWM2YjBmMDRiN2ViNmRkIn0sImlhdCI6MTU2NTAxNjA4MCwiZXhwIjoxNTY1Mzc2MDgwfQ.4Vpm6v5BDWLjHEMLeB7JDo9Ma5dlZQR6hSL0tz8-7gQ"
}
```

`And the most important data inside the token is`

```js
{
  user: {
    id: user.id;
  }
}
```


### `Step2: Create a custom middleware.`

#### `Create a new folder call 'middleware', Location:`

`(*4.1)Location: ./middleware/auth.js`

```js
const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('jwtSecret');

module.exports = function(req, res, next) {
  // Get token form header
  const token = req.header('x-auth-token');

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded.user;//{id: user.id}

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
```

#### `Side-note(Chinese):`

- 这个中间件的用途在于在调用实际 API 之前对 request 进行预处理或者过滤处理，比如在这个中间件中，先提取`req.header的‘x-auth-token’`部分,然后进行判断有无，然后使用 jsonwebtoken 的内建函数进行解码。
- 需要注意的是 jwt.verify()函数需要两个参数，一个是 request 中的令牌，另外一个是打包令牌时使用的钥匙，这个函数返回的是打包前的原本数据。
- 我们只提取原本数据中的`user`值，并把值附在 request 上面，这样 req 就有了一个新的 key pair<br>(即`req.user = { id: user.id}`)。
- 这个中间件的设置是，如果解码成功，则把改造后的 req 穿到下一个中间件或者实际 API 函数，如果解码不成功，产生错误并反馈。
- #### `这个中间件的编导逻辑很重要，需要重点反复练习。`

### `Step3: Use the new middleware in auth get route.`

`(*4.2)Location:./api/auth.js`

```js
const router = require('express').Router();
const auth = require('../middleware/auth');

const { User } = require('../models');

//@route   Get api/auth
//@desc    Authenticate user & get token
//@access  Public

router.get(`/`, auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error.');
  }
});

module.exports = router;
```

#### `Side-note(Chinese):`

- request 通过中间件之后，req.user.id 的值就是对应的 user 在 MongoDB Altas 中的`_id`值。
- 我们可以通过 model `User.findById`获得对应的 user 数据。

- 整个过程可以归结为：

<ol>
<li>创建一个新用户，用jsonwebtoken内建函数将生成的MongoDB ALtas对应的数据的`_id`值打包，并返回一个令牌，这过程需要一个自定义打包钥匙。</li>
<li>创建一个中间件，捕获header的‘x-auth-token’值，并用打包钥匙对其进行解码，获得原始数据，把原始数据的id值赋值在request中。</li>
<li>在auth的get路径中，当request经过中间件auth后，req.user.id就是令牌中原始数据的user.id值。</li>
<li>通过 model `User.findById`获得对应的 user 数据</li>
</ol>

#### `总结`：
- 在这个Get route中，request是不需要任何参数的，只需要在x-auth-token输入token就可以返回相应令牌里面对应的用户信息，在这个过程中要注意打包钥匙(const secret = 'mysecrettoken')的前后一致性才能解码成功。

### `Step4: Test it.`

- In postman: Post a new user(localhost:5000/api/user)
<p align="center">
<img src="../../assets/13.png" width=90%>
</p>

- In postman: Get a user(localhost:5000/api/auth)
<p align="center">
<img src="../../assets/16.png" width=90%>
</p>

- Data in MongoDB Altas
<p align="center">
<img src="../../assets/15.png" width=90%>
</p>