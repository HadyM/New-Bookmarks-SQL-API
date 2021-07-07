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
      bookmark.name !== typeof "string" ||
      bookmark.url !== typeof "string" ||
      bookmark.category !== typeof "string" ||
      bookmark.is_favorite !== typeof "boolean"
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

module.exports = {
  getAllBookmarks,
  getBookmark,
  createBookmark,
};
