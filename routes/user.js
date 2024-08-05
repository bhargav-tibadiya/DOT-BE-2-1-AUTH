const express = require('express');
const router = express.Router();

const { login, signup } = require('../controllers/auth');
const { auth, isAdmin, isStudent } = require('../middleware/Auth');

router.post("/signup", signup)
router.post("/login", login)

router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Test Route (Protected) "
  })
})
// Protected Routes
router.post("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Student Route (Protected) "
  })
})

router.post("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Admin Route (Protected) "
  })
})

module.exports = router;