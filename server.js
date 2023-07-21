const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const routes = require('./routes/api');
const app = express();
const port = process.env.PORT || 5000;

/* Middleware */
app.use(bodyParser.json());

app.use('/api', routes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

/* //connect to the database
mongoose.connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise; */
mongoose.connect('mongodb+srv://admin:admin@crudnodejs.ydtzqky.mongodb.net/LogIn-Registration?retryWrites=true&w=majority')
.then(() => {
  console.log('MongoDB is Already Connected')

  app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
  });
}).catch((error) => {
  console.log(error)
}); 

