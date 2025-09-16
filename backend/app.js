const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");

const app = express();

require("dotenv").config();

// Configuration CORS spécifique pour GitHub Pages
const corsOptions = {
  origin: [
    "https://lucdub-code.github.io",
    "http://localhost:3000",
    "http://localhost:3001"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB Atlas réussie !"))
  .catch(() => console.log("Connexion à MongoDB Atlas échouée !"));

app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
