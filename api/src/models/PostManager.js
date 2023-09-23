const AbstractManager = require("./AbstractManager");

class PostManager extends AbstractManager {
  static table = "post";

  findAll() {
    return this.connection.query(
      `select p.*, u.id AS userId, username, profilePic from ${PostManager.table} AS p JOIN user AS u ON (u.id = p.userId)
       ORDER BY createdAt DESC`
    );
  }

  insert(post) {
    return this.connection.query(
      `insert into ${this.table} (\`desc\`, img, userId, createdAt) values (?, ?, ?, ?)`,
      [post.desc, post.img, post.userId, post.createdAt]
    );
  }
}

module.exports = PostManager;
