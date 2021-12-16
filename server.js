const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
require('./config/db');
const clientRoutes = require("./routes/client.routes");
const articleRoutes = require("./routes/article.routes");
const SAVRequestRoutes = require("./routes/SAVRequest.routes");
const commandRoutes = require("./routes/command.routes");
const { checkClient, requireAuth } = require("./middlewares/auth.middleware");
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
app.use(cookieParser());

// jwt
app.get("*", checkClient);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.client._id);
});

// routes
app.use("/api/client", clientRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/savrequest", SAVRequestRoutes);
app.use("/api/command", commandRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});