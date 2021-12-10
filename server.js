const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
require('./config/db');
const clientRoutes = require("./routes/client.routes");
const { checkClient, requireAuth } = require("./middlewares/auth.middleware");



const app = express();

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

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});