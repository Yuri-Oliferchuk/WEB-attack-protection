const express = require('express');
const path = require('path');
const app = express();

const PORT = 4001;

const csurf = require('csurf');
const cookieParser = require('cookie-parser');

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const csrfMiddleware = csurf ({
    cookie: {
        maxAge: 300000000,
        secure: true,
        sameSite: 'none'
    }
});

app.use(cookieParser());
app.use(csrfMiddleware);

app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
     res.status(403)
     res.send("WTF? The CSRF token is invalid")
    } else {
      next();
    }
  })

app.get('/', (req, res) => {
  // Send csrfToken to form.ejs here
  res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/submit', (req, res) => {
  res.send(`<p>Post successful!</p> <p>CSRF token used: ${req.body._csrf}</p>`);
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`) );