const bcrypt = require('bcrypt');
const user = require('../models/user');

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
    console.log('Error in Signup || ', error)
    return res.status(500).json({
      success: false,
      message: "User Can not be Registred Please Try again later"
    });
  }
}