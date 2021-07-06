// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const bookmarksController = require("./controllers/bookmarkController.js");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Bookmarks API!!");
});

app.use("/bookmarks", bookmarksController);

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page Not FOUND!");
});

// EXPORT
module.exports = app;
