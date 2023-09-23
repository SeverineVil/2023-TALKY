const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  static table = "comment";

  findAll() {
    return this.connection.query(
      `select c.*, u.id AS userId, username, profilePic FROM ${CommentManager.table} AS c JOIN user AS u ON (u.id = c.userId)
     ORDER BY c.createdAt DESC`
    );
  }

  insert(comment) {
    return this.connection.query(
      `INSERT INTO ${this.table} (\`desc\`, createdAt, userId, postId) VALUES (?, ?, ?, ?)`,
      [comment.desc, comment.createdAt, comment.userId, comment.postId]
    );
  }
}
module.exports = CommentManager;
