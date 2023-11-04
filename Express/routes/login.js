// var express = require('express');
// var router = express.Router();
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// // const User = require("../models/users");

// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true
//   },

//   email: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// const User = mongoose.model('user', userSchema);

// router.post("/", async (req, res) => {
//   console.log(req.body,"yttfytfytf");
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email: email });
//     console.log(user);
//     const passwordcheck = await bcrypt.compare(password, user.password)
//     console.log(passwordcheck);
//     if (!user) {
//       return res.status(401).send('Invalid email or password');
//     } else if (!passwordcheck) {
//       return res.status(401).send('Invalid email or password');
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Login failed');
//   }
// });


// module.exports = router

var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure the email is unique
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

// router.post("/", async (req, res) => {
//   // try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     console.log(user);
//     if (!user) {
//       res.status(401).
//       json({ message: 'Invalid email or password' });
//     }
//    console.log(user.password, 'asdfasdf')

//     const passwordCheck = await bcrypt.compare(password, user.password);
//     if (!passwordCheck) {
//       return res.status(401).
//       json({ message: 'Invalid email or password' });;
//     }

    // Don't send the entire user object in response for security reasons
   
    // res.status(200).json({ user }); // Send only necessary information

  // } catch (err) {
  //   console.error(err);
  //   res.status(500).send('Login failed');
  // }
// });

module.exports = router;
