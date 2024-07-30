const mongoose = require('mongoose')

require('dotenv').config();

exports.connect = () => {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => { console.log("Database Connection Successful") })
    .catch((err) => { console.log("Error in Connection", err) });
} 