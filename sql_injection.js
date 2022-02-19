const express = require('express');
const partials = require('express-partials');
const path = require('path');
const validator = require('validator');

const app = express();

const PORT = 4001;

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(partials());


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "/public")));



app.get('/', (req, res) => {
  res.render('form_validation', { emailStatus: null })
})

app.post('/email', 
  (req, res) => {
    const response = {
      normalizedEmail: validator.normalizeEmail(req.body.emailForm) // Normalize email here
    }

    res.json({message: response})
});

app.post('/date', 
  (req, res) => {
    const response = {
      sanitizedDate: validator.toDate(req.body.dateForm) // Sanitize date here 
    }

    res.json({message: response})
});

app.post('/escape', 
  (req, res) => {
    const response = {
      escapedValue: validator.escape(req.body.escapeForm)// Escape form values here 
    }

    res.json({message: response})
});

app.listen(process.env.PORT || PORT, () => console.log(`Listening on http://localhost:${PORT}`) );
