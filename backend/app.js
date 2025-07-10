const express = require('express');
const mongoose = require('mongoose');

const bookRoutes = require('./routes/book');

const app = express();

mongoose.connect('mongodb+srv://lucdubcom:dLA3aNy78aIBj7Sk@monvieuxgrimoire.lv15ti6.mongodb.net/?retryWrites=true&w=majority&appName=MonVieuxGrimoire',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB Atlas réussie !'))
  .catch(() => console.log('Connexion à MongoDB Atlas échouée !'));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
  next();
});

app.use('/api/books', bookRoutes);

module.exports = app;