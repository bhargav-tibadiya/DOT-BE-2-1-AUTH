const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.auth = (req, res, next) => {
  try {

    // Printing Token from all method

    console.log('cookies', req.cookies.token);
    console.log('body ', req.body.token);
    console.log('header', req.header("Authoriztion"));

    const token = req.body.token || req.cookies.token || req.header("Authoriztion").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is Missing"
      });
    }

    // verify the token

    try {

      const decode = jwt.verify(token, process.env.JWT_SECRET)
      console.log('decode :: ', decode);

      req.user = decode;

    } catch (error) {
      console.log('Error in auth Middleware || ', error)
      return res.status(401).json({
        success: false,
        message: "Invalid Token"
      });
    }

    next();

  } catch (error) {
    console.log('Error in auth Middleware || ', error)
    return res.status(401).json({
      success: false,
      message: "Some error occured in Auth Middleware"
    });
  }
}

exports.isStudent = (req, res, next) => {
  try {

    if (req.user, role !== "student") {
      return res.status(401).json({
        success: false,
        message: "Only Student can access this routes"
      })
    }

    next();

  } catch (error) {
    console.log('Error in auth Middleware || ', error)
    return res.status(401).json({
      success: false,
      message: "Some error occured in isStudent Middleware"
    });
  }
}

exports.isAdmin = (req, res, next) => {
  try {

    if (req.user, role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Only Student can access this routes"
      })
    }

    next();

  } catch (error) {
    console.log('Error in auth Middleware || ', error)
    return res.status(401).json({
      success: false,
      message: "Some error occured in isStudent Middleware"
    });
  }
}