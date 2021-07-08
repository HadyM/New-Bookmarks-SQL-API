// DEPENDENCIES
const db = require("../db/dbConfig.js");

const getAllBookmarks = async () => {
  try {
    const allBookmarks = await db.any("SELECT * FROM bookmarks");
    return allBookmarks;
  } catch (err) {
    return err;
  }
};

// SHOW
const getBookmark = async (id) => {
  try {
    const oneBookmark = await db.one("SELECT * FROM bookmarks WHERE id=$1", id);
    return oneBookmark;
  } catch (err) {
    return err;
  }
};

// CREATE
const createBookmark = async (bookmark) => {
  try {
    if (
      !bookmark.name ||
      !bookmark.url ||
      !bookmark.category ||
      !bookmark.is_favorite
    ) {
      throw "You must specify a value";
    }
    if (
      typeof bookmark.name !== "string" ||
      typeof bookmark.url !== "string" ||
      typeof bookmark.category !== "string" ||
      typeof bookmark.is_favorite !== "boolean"
    ) {
      throw "You must specify a string or boolean";
    }
    const newBookmark = await db.one(
      "INSERT INTO bookmarks (name, url, category, is_favorite) VALUES($1, $2, $3, $4) RETURNING *",
      [bookmark.name, bookmark.url, bookmark.category, bookmark.is_favorite],
    );
    return newBookmark;
  } catch (err) {
    return err;
  }
};

// DELETE
const deleteBookmark = async (id) => {
  try {
    const deleted = await db.one(
      "DELETE FROM bookmarks WHERE id = $1 RETURNING *",
      id,
    );
    return deleted;
  } catch (err) {
    return err;
  }
};

// UPDATE
const updateBookmark = async (id, bookmark) => {
  try {
    const updatedBookmark = await db.one(
      "UPDATE bookmarks SET name = $1, url = $2, category = $3, is_favorite = $4 WHERE id = $5 RETURNING *",
      [
        bookmark.name,
        bookmark.url,
        bookmark.category,
        bookmark.is_favorite,
        bookmark.id,
      ],
    );
    return updatedBookmark;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  deleteBookmark,
  updateBookmark,
};
