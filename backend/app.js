const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");

const app = express();

require("dotenv").config();

// Configuration CORS améliorée - appliquée à TOUS les types de requêtes
app.use((req, res, next) => {
  // Autoriser GitHub Pages et localhost
  const allowedOrigins = [
    'https://lucdub-code.github.io',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:4000'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Gérer les requêtes preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB Atlas réussie !"))
  .catch(() => console.log("Connexion à MongoDB Atlas échouée !"));

app.use(express.json());

// Route dédiée pour servir les images avec CORS
app.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "images", filename);
  
  // Vérifier si le fichier existe
  const fs = require('fs');
  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: "Image not found" });
  }
  
  // Headers CORS spécifiques pour les images
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache 1 an
  
  // Servir l'image
  res.sendFile(imagePath);
});

app.use("/api/books", bookRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
