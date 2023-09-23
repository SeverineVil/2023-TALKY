const AbstractManager = require("./AbstractManager");

class LikesManager extends AbstractManager {
  static table = "likes";

  findAll(postId) {
    return this.connection.query(
      `SELECT COUNT(*) FROM ${LikesManager.table} WHERE postId = ?`,
      [postId]
    );
  }

  checkLiked(postId, userId) {
    return this.connection.query(
      `SELECT * FROM ${LikesManager.table} WHERE  postId = ? AND userId = ?`,
      [postId, userId]
    );
  }

  insert(likes) {
    return this.connection.query(
      `INSERT INTO ${LikesManager.table} (userId, postId) VALUES (?, ?)`,
      [likes.userId, likes.postId]
    );
  }

  unliked(likes) {
    return this.connection.query(
      `DElETE FROM ${LikesManager.table} WHERE userId = ? AND postId = ?`,
      [likes.userId, likes.postId]
    );
  }
}
module.exports = LikesManager;
