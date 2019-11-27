# MERN-Template
## `Section: Deploy`(Heroku Deploy)

### `Summary`: In this documentation, we deploy the MERN template in heroku.

### Before you deploy, heroku and git should be download and ready.

- Go to heroku website, create a new account
<p align="center">
<img src="./assets/50.png" width=90%>
</p>

- Download the heroku CLI.
<p align="center">
<img src="./assets/51.png" width=90%>
</p>

- Type `heroku login` in the bash.
<p align="center">
<img src="./assets/52.png" width=90%>
</p>

- Click Log in button in the browser.
<p align="center">
<img src="./assets/53.png" width=90%>
</p>

### `Brief Contents & code position`
- 1. Add a new file in config folder, call 'production.json'.`./config/production.json`
- 2. Add code in .gitignore. `./.gitignore`
- 3. Add a script in package.json `./package.json`
- 4. Add some code in server.js `./server.js`
- 5. Type some commands in bash.

### `Step1: Add a new file in config folder, call 'production.json.`

#### `1.Location: ./config/production.json`

- copy all code in default.json

```js
{
    "mongoURI":"mongodb+srv://donghao:Qs5LEDWIaPITXIIn@cluster0-qvchz.mongodb.net/test?retryWrites=true&w=majority",
    "jwtSecret":"mySecretToken"
}
```

#### `Comments:`
- 这上面的内容因人而定，根据mongoDB Altas设定的连接密码，还有自设定的token加密secret。 

### `Step2: Add code in .gitignore.`

#### `2.Location: ./.gitignore`

```bash
node_modules/
config/default.json
```
#### `Comments:`
- 关键数据不上传，但在production.json中？

### `Step3: Add a script in package.json.`

#### `3.Location: ./package.json`

```js
"heroku-postbuild":"NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
```

#### `Comments:`
- 暂无。

### `Step4: Add some code in server.js.`

#### `4.Location: ./server.js`

```js
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
//apply
const app = express();
//middleware
app.use(express.json({ extended: false }));
//port
const PORT = process.env.PORT || 5000;

/*
DB here!
*/
connectDB();

/*
Routes here!
*/
app.use("/api", require("./api"));

//Serve static  assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => console.log(`server is listening on port ${PORT} ===>`));
```

#### `Comments:`
- 添加代码第一段：
```js
const path = require('path');
```
- 添加代码第二段，这一段一定要放在所有route code以下：
```js
//Serve static  assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
```
- 另外要注意，process.env.PORT是一定要有的：
```js
const PORT = process.env.PORT || 5000;
```

### `Step5: Type some code in Bash.`

```bash
$ heroku create
$ git init
$ git add .
$ git commit -m'Ready for deployment'
$ heroku git:remote -a [your heroku remote name]
$ git push heroku master
```

#### `Comments:`
- You can find your heroku remote name here:

<p align="center">
<img src="./assets/54.png" width=90%>
</p>

<p align="center">
<img src="./assets/55.png" width=90%>
</p>

### `Step6: Test it.`

- Type in the commands in step5.
<p align="center">
<img src="./assets/56.png" width=90%>
</p>

<p align="center">
<img src="./assets/57.png" width=90%>
</p>

- Deploy success.
<p align="center">
<img src="./assets/58.png" width=90%>
</p>

- Open the app in heroku.
<p align="center">
<img src="./assets/59.png" width=90%>
</p>
