const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "user";

  findByUsername(username) {
    return this.connection
      .query(`select * from ${UserManager.table} where username = ?`, [
        username,
      ])
      .then((result) => {
        console.warn(result);
        return result;
      });
  }

  findByMail(email) {
    return this.connection.query(
      `select * from ${UserManager.table} where email = ?`,
      [email]
    );
  }

  insert(user) {
    return this.connection.query(
      `insert into ${this.table} (username, email, password, name) values (?, ?, ?, ?)`,
      [user.username, user.email, user.password, user.name]
    );
  }

  update(user) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [user.title, user.id]
    );
  }

  findAll() {
    return this.connection.query(
      `select id, username, email, name, coverPic, profilePic from ${UserManager.table}`
    );
  }
}

module.exports = UserManager;
