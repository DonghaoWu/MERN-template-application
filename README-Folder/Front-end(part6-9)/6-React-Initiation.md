# MERN-Template(part 6)
## `Section: Frontend`(Install Front end dependencies and clean up code)

### `Summary`: In this documentation, we install some dependencies and clean up code.

### `Check Dependencies:`

- concurrently (back-end)
- react
- axios
- react-router-dom
- redux
- react-redux
- redux-thunk
- redux-devtools-extension
- moment
- react-moment
- uuid

### `Brief Contents & codes position`
- *6.1 Clean up code and add font awesome CDN. `./client/public/index.html`
- *6.2 Clean up code. `./client/src/index.js`
- *6.3 Clean up code and import 2 components`./client/src/App.js`
- *6.4 Create a component 'Navbar'. `./client/components/layout/Navbar.js`
- *6.5 Create a component 'Landing'. `./client/components/layout/Landing.js`
- *6.6 Add css code. `./client/src/App.css`
- *6.7 Clean up code. `./client/public/manifest.json`

### `Step1: Install dependencies:`

```bash
$ npx create-react-app client
$ npm install concurrently
$ cd client
$ npm install axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment react-moment uuid
$ rm -rf .git
$ cd ..
```
### `Step2: Delete some files.`

#### `Location: ./client folder`
- .gitignore
- README.md

#### `Location: ./client/src folder`
- serviceWorker.js
- logo.svg
- index.css
- App.test.js

#### `Location: ./client/public folder`
- favicon.ico
- logo192.png
- logo512.png
- robots.txt

### `Step3: Add some files.`

#### `Location: ./client folder`
- new folder call 'img'
- add a picture into 'img' folder as a background picture

#### `Location: ./client/src folder`
- new folder call 'components'

#### `Location: ./client/src/components folder`
- new folder call 'layout'

#### `Location: ./client/src/components folder`
- new file call 'Landing.js'
- new file call 'Navbar.js'

### `Step4: Add some code in package.json.`

#### `Location: ./client/package.json`

```diff
+ "proxy": "http://localhost:5000"
```

#### `Location: ./package.json`

```diff
+ "client": "npm start --prefix client",
+ "dev": "concurrently \"npm run server\" \"npm run client\""
```

### `Step5: Change some code.`

#### `(*6.1)Location: ./client/public/index.html`
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-app" />
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  <script src="https://kit.fontawesome.com/07a2063e2d.js" crossorigin="anonymous"></script>
  <title>MERN template</title>
</head>

<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
</body>

</html>
```

#### `(*6.2)Location: ./client/src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

#### `(*6.3)Location: ./client/src/App.js`

```js
import React, { Fragment } from 'react';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import './App.css';

const App = () => (
  <Fragment>
    <Navbar />
    <Landing />
  </Fragment>
)

export default App;
```

#### `(*6.4)Location: ./client/components/layout/Navbar.js`

```js
import React from 'react'

const Navbar = props => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <a href="index.html"><i className="fas fa-code"></i> MERN ICON</a>
            </h1>
            <ul>
                <li><a href="profiles.html">User name</a></li>
                <li><a href="register.html">Register</a></li>
                <li><a href="login.html">Login</a></li>
            </ul>
        </nav>
    )
}

export default Navbar
```

#### `(*6.5)Location: ./client/components/layout/Landing.js`

```js
import React from 'react'

const Landing = props => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">MERN STACK</h1>
                    <p className="lead">
                        TEMPLATE
                    </p>
                    <div className="buttons">
                        <a href="register.html" className="btn btn-primary">Sign Up</a>
                        <a href="login.html" className="btn btn-light">Login</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing
```

#### `(*6.6)Location: ./client/src/App.css`

```css
/* Global Styles */
:root {
  --primary-color: #17a2b8;
  --dark-color: #343a40;
  --light-color: #f4f4f4;
  --danger-color: #dc3545;
  --success-color: #28a745;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Raleway', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  background-color: #fff;
  color: #333;
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

ul {
  list-style: none;
}

img {
  width: 100%;
}

/* Utilities */
.container {
  max-width: 1100px;
  margin: auto;
  overflow: hidden;
  padding: 0 2rem;
  margin-top: 6rem;
  margin-bottom: 3rem;
}

/* Text Styles*/
.x-large {
  font-size: 4rem;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.large {
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.lead {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.text-center {
  text-align: center;
}

.text-primary {
  color: var(--primary-color);
}

.text-dark {
  color: var(--dark-color);
}

/* Padding */
.p {
  padding: 0.5rem;
}
.p-1 {
  padding: 1rem;
}
.p-2 {
  padding: 2rem;
}
.p-3 {
  padding: 3rem;
}
.py {
  padding: 0.5rem 0;
}
.py-1 {
  padding: 1rem 0;
}
.py-2 {
  padding: 2rem 0;
}
.py-3 {
  padding: 3rem 0;
}

/* Margin */
.m {
  margin: 0.5rem;
}
.m-1 {
  margin: 1rem;
}
.m-2 {
  margin: 2rem;
}
.m-3 {
  margin: 3rem;
}
.my {
  margin: 0.5rem 0;
}
.my-1 {
  margin: 1rem 0;
}
.my-2 {
  margin: 2rem 0;
}
.my-3 {
  margin: 3rem 0;
}

.btn {
  display: inline-block;
  background: var(--light-color);
  color: #333;
  padding: 0.4rem 1.3rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: opacity 0.2s ease-in;
  outline: none;
}

.badge {
  font-size: 0.8rem;
  padding: 0.1rem;
  text-align: center;
  margin: 0.3rem;
  background: var(--light-color);
  color: #333;
}

.alert {
  padding: 0.8rem;
  margin: 1rem 0;
  opacity: 0.9;
  background: var(--light-color);
  color: #333;
}

.btn-primary,
.bg-primary,
.badge-primary,
.alert-primary {
  background: var(--primary-color);
  color: #fff;
}

.btn-light,
.bg-light,
.badge-light,
.alert-light {
  background: var(--light-color);
  color: #333;
}

.btn-dark,
.bg-dark,
.badge-dark,
.alert-dark {
  background: var(--dark-color);
  color: #fff;
}

.btn-danger,
.bg-danger,
.badge-danger,
.alert-danger {
  background: var(--danger-color);
  color: #fff;
}

.btn-success,
.bg-success,
.badge-success,
.alert-success {
  background: var(--success-color);
  color: #fff;
}

.btn-white,
.bg-white,
.badge-white,
.alert-white {
  background: #fff;
  color: #333;
  border: #ccc solid 1px;
}

.btn:hover {
  opacity: 0.8;
}

.bg-light,
.badge-light {
  border: #ccc solid 1px;
}

.round-img {
  border-radius: 50%;
}

.line {
  height: 1px;
  background: #ccc;
  margin: 1.5rem 0;
}

/* Overlay */
.dark-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Forms */
.form .form-group {
  margin: 1.2rem 0;
}

.form .form-text {
  display: block;
  margin-top: 0.3rem;
  color: #888;
}

.form input[type='text'],
.form input[type='email'],
.form input[type='password'],
.form input[type='date'],
.form select,
.form textarea {
  display: block;
  width: 100%;
  padding: 0.4rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
}

.form input[type='submit'],
button {
  font: inherit;
}

.form .social-input {
  display: flex;
}

.form .social-input i {
  padding: 0.5rem;
  width: 4rem;
}

.form .social-input i.fa-twitter {
  color: #38a1f3;
}
.form .social-input i.fa-facebook {
  color: #3b5998;
}
.form .social-input i.fa-instagram {
  color: #3f729b;
}
.form .social-input i.fa-youtube {
  color: #c4302b;
}
.form .social-input i.fa-linkedin {
  color: #0077b5;
}

.table th,
.table td {
  padding: 1rem;
  text-align: left;
}

.table th {
  background: var(--light-color);
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 2rem;
  position: fixed;
  z-index: 1;
  width: 100%;
  top: 0;
  border-bottom: solid 1px var(--primary-color);
  opacity: 0.9;
}

.navbar ul {
  display: flex;
}

.navbar a {
  color: #fff;
  padding: 0.45rem;
  margin: 0 0.25rem;
}

.navbar a:hover {
  color: var(--primary-color);
}

.navbar .welcome span {
  margin-right: 0.6rem;
}

/* Landing Page */
.landing {
  position: relative;
  background: url('./img/background.jpg') no-repeat center center/cover;
  height: 100vh;
}

.landing-inner {
  color: #fff;
  height: 100%;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Profiles Page */
.profile {
  display: grid;
  grid-template-columns: 2fr 4fr 2fr;
  align-items: center;
  grid-gap: 2rem;
  padding: 1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
}

/* Profile Page */
.profile-grid {
  display: grid;
  grid-template-areas:
    'top top'
    'about about'
    'exp edu'
    'github github';
  grid-gap: 1rem;
}

.profile-top {
  grid-area: top;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.profile-top img {
  width: 250px;
}

.profile-top .icons a {
  color: #fff;
  margin: 0 0.3rem;
}

.profile-top .icons a:hover {
  color: var(--dark-color);
}

.profile-about {
  grid-area: about;
  text-align: center;
}

.profile-about .skills {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.profile-exp {
  grid-area: exp;
}

.profile-edu {
  grid-area: edu;
}

.profile-exp h2,
.profile-edu h2 {
  margin-bottom: 1rem;
}

.profile-exp > div,
.profile-edu > div {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: #ccc 1px dotted;
}

.profile-exp > div:last-child,
.profile-edu > div:last-child {
  border: 0;
}

.profile-exp p,
.profile-edu p {
  margin: 0.5rem 0;
}

.profile-github {
  grid-area: github;
}

.profile-github .repo {
  display: flex;
}

.profile-github .repo > div:first-child {
  flex: 7;
  flex-basis: 70%;
}

.profile-github > div:last-child {
  flex: 3;
  flex-basis: 20%;
}

/* Posts Page */
.post-form .post-form-header {
  background: var(--primary-color);
  padding: 0.5rem;
}

.post {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 2rem;
  align-items: center;
}

.post > div:first-child {
  text-align: center;
}

.post img {
  width: 100px;
}

.post .comment-count {
  background: var(--light-color);
  color: var(--primary-color);
  padding: 0.1rem 0.2rem;
  border-radius: 5px;
  font-size: 0.8rem;
}

.post .post-date {
  color: #aaa;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

/* Mobile Styles */
@media (max-width: 700px) {
  .container {
    margin-top: 8rem;
  }

  .hide-sm {
    display: none;
  }

  /* Text Styles */
  .x-large {
    font-size: 3rem;
  }

  .large {
    font-size: 2rem;
  }

  .lead {
    font-size: 1rem;
  }

  /* Navbar */
  .navbar {
    display: block;
    text-align: center;
  }

  .navbar ul {
    text-align: center;
    justify-content: center;
  }

  .navbar h1 {
    margin-bottom: 1rem;
  }

  .navbar .welcome {
    display: none;
  }

  /* Profiles Page */
  .profile {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .profile ul {
    display: none;
  }

  /* Profile Page */

  .profile-top img,
  .profile img {
    width: 200px;
    margin: auto;
  }

  .profile-grid {
    grid-template-areas:
      'top'
      'about'
      'exp'
      'edu'
      'github';
  }

  .profile-about .skills {
    flex-direction: column;
  }

  .dash-buttons a {
    display: block;
    width: 100%;
    margin-bottom: 0.2rem;
  }

  .post {
    grid-template-columns: 1fr;
  }
  .post a,
  .post button {
    padding: 0.3rem 0.4rem;
  }
}

th, td {
    border: 1px solid black;
    padding: 20px;
    text-align: center;
    font-size: 1.2rem;
}

.tran_header{
  font-size: 2rem;
  color: #0077b5;
  margin: 2rem auto;
}


.portfolio_container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.holding_stocks{
  margin-right: 20px;
}

.green{
  color:green;
}

.red{
  color:red;
}
.grey{
  color:grey
}
```

#### `(*6.7)Location: ./client/public/manifest.json`
```js
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

### `Step6: Test it.`

- Run command in the right directory

```bash
$ npm run dev
```
<p align="center">
<img src="../../assets/20.png" width=90%>
</p>

- In the browser show this
<p align="center">
<img src="../../assets/21.png" width=90%>
</p>