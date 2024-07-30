const express = require('express')
const app = express();


require('dotenv').config();
const port = process.env.PORT || 4000;

app.use(express.json());

//  Importing routes
require('./config/database').connect();
const user = require('./routes/user');

app.use('/api/v1', user);



//  Activating Server
app.listen(port, () => {
  console.log(`Server is Listening on port:${port}`);
})