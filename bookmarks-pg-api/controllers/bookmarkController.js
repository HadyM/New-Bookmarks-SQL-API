const express = require("express");
const bookmarks = express.Router();
const {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  deleteBookmark,
  updateBookmark,
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
      res.status(200).json(bookmark);
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
      res.status(200).json(bookmark);
    } else {
      console.log(`Database error: ${bookmark}`);
      throw `Error adding ${req.body} to the database.`;
    }
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

//DELETE
bookmarks.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBookmark = await deleteBookmark(id);
    if (deletedBookmark["id"]) {
      res.status(200).json(deletedBookmark);
    } else {
      console.log(`Database error: ${bookmark}`);
      throw `Could not delete bookmark with id: ${id}`;
    }
  } catch (err) {
    res.status(404).json({
      error: "Resource can not be deleted. Please try again.",
      message: err,
    });
  }
});

// UPDATE
bookmarks.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBookmark = await updateBookmark(id, req.body);
    if (updatedBookmark["id"]) {
      res.status(200).json(updatedBookmark);
    } else {
      console.log(`Database error: ${bookmark}`);
      throw `Could not update bookmark with id: ${id}`;
    }
  } catch (err) {
    res.status(404).json({
      error: "Resource can not be updated. Please try again.",
      message: err,
    });
  }
});

module.exports = bookmarks;
