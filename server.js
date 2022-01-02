const express = require("express");
require("dotenv").config({ path: "./config/.env" });
require('./config/db');
const articleRoutes = require("./routes/article.routes");
const SAVRequestRoutes = require("./routes/SAVRequest.routes");
const commandRoutes = require("./routes/command.routes");
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/api/article", articleRoutes);
app.use("/api/savrequest", SAVRequestRoutes);
app.use("/api/command", commandRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});