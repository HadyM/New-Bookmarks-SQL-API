const express = require("express");
const bookmarks = express.Router();
const {
  getAllBookmarks,
  getBookmark,
  createBookmark,
} = require("../queries/bookmarks");

// INDEX
bookmarks.get("/", async (req, res) => {
  const allBookmarks = await getAllBookmarks();
  res.json(allBookmarks);
});

// SHOW
bookmarks.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const bookmark = await getBookmark(id);
    if (bookmark["id"]) {
      res.json(bookmark);
    } else {
      console.log(`Database error: ${bookmark}`);
      throw `There is no bookmark with id: ${id}`;
    }
  } catch (e) {
    res.status(404).json({ error: "Resource not found.", message: e });
  }
});

// CREATE
bookmarks.post("/", async (req, res) => {
  try {
    const bookmark = await createBookmark(req.body);
    if (bookmark["id"]) {
      res.json(bookmark);
    } else {
      console.log(`Database error: ${bookmark}`);
      throw `Error adding ${req.body} to the database.`;
    }
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

module.exports = bookmarks;
