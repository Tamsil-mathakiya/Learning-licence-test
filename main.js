const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const Login = require('./models/logindb');  // Ensure this path is correct
const Register = require('./models/registerdb');  // Ensure this path is correct
// const { register } = require('module/');
const port = 3000;

app.use(express.static('public'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/indax.html'));  // Ensure this path is correct
});

app.post('/index.html', async (req, res) => {
  try {
    console.log('Received login data:', req.body);  // Log incoming data

    // Check if the user is registered
    const user = await Register.findOne({ emailid: req.body.username });
    if (!user) {
      return res.redirect('/register.html');
    }

    // Save the login data
    const newLogin = new Login({
      username: req.body.username,
      password: req.body.password
    });
    await newLogin.save();
    res.redirect('/quiz.html');
  } catch (error) {
    console.error('Error saving login data:', error);  // Log errors
    res.status(400).send(error);
  }
});

app.post('/register.html', async (req, res) => {
  try {
    console.log('Received registration data:', req.body);  // Log incoming data
    const newRegister = new Register({
      emailid: req.body.emailid,
      name: req.body.name,
      age: req.body.age,
      contactnumber: req.body.contactnumber
    });
    await newRegister.save();
    res.redirect('/indax.html');
  } catch (error) {
    console.error('Error saving registration data:', error);  // Log errors
    res.status(400).send(error);
  }
});

mongoose.connect('mongodb://localhost:27017/project-1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connection successful');
})
.catch((err) => {
  console.error('Connection error:', err);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
