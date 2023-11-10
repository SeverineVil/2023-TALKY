const AbstractManager = require("./AbstractManager");

class PostManager extends AbstractManager {
  static table = "post";

  findAll() {
    return this.connection.query(
      `SELECT p.*, u.id AS userId, username, profilePic from ${PostManager.table} AS p JOIN user AS u ON (u.id = p.userId)
       ORDER BY createdAt DESC`
    );
  }

  insert(post) {
    return this.connection.query(
      `INSERT into ${this.table} (\`desc\`, img, userId, createdAt) values (?, ?, ?, ?)`,
      [post.desc, post.img, post.userId, post.createdAt]
    );
  }

  delete(id) {
    return this.connection.query(
      `DELETE from ${PostManager.table} WHERE id = ?`,
      [id]
    );
  }
}

module.exports = PostManager;
