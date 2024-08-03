const bcrypt = require('bcrypt');
const user = require('../models/user');
const jwt = require('jsonwebtoken')

require('dotenv').config()

//signup route handler
exports.signup = async (req, res) => {
  try {
    // fetchdata
    const { name, email, password, role } = req.body;

    //check if User Exists
    const existingUser = await user.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists"
      });
    }

    //Encrypt Password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in Hashing Password"
      });
    }

    //Create Entry for user
    const userData = await user.create({
      name, email, password: hashedPassword, role
    })

    return res.status(200).json({
      success: true,
      message: "User Created Successfully"
    });


  } catch (error) {
    console.error('Error in Signup || ', error)
    return res.status(500).json({
      success: false,
      message: "User Can not be Registred Please Try again later"
    });
  }
}


//login route handler
exports.login = async (req, res) => {
  try {

    // fetching data
    const { email, password } = req.body;

    // checking if data exists
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All the Details"
      });
    }

    // checking if user exists
    const userData = await user.findOne({ email })

    if (!userData) {
      return res.status(401).json({
        success: false,
        message: "No user found Please Register"
      });
    }

    const payload = {
      email: userData.email,
      id: userData._id,
      role: userData.role
    };

    // Verify Password and Generate JWT Token
    if (bcrypt.compare(password, userData.password)) {

      let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1m' })
      userData.token = token;
      userData.password = undefined;

      const options = {
        expires: new Date(Date.now() + (3 * 24 * 60 * 60 * 100)),
        httpOnly: true,
      }
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        userData,
        message: "Login Success"
      })

    } else {
      return res.status(403).json({
        success: false,
        message: "Password Is Not Correct"
      });
    }

  } catch (error) {
    console.log('Error in Signup || ', error)
    return res.status(500).json({
      success: false,
      message: "User Can not be Registred Please Try again later"
    });
  }
}