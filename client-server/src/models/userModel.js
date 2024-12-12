import db from "../config/dbConfig.js";

class UserModel {
  static tableName = "users";

  static async getAll() {
    return db(this.tableName).select("*");
  }

  static async getById(id) {
    return db(this.tableName).where({ id }).first();
  }

  static async getByEmail(email) {
    return db(this.tableName).where({ email }).first();
  }

  static async create(userData) {
    const [id] = await db(this.tableName).insert(userData);
    return id;
  }

  static async updateById(id, userData) {
    return db(this.tableName).where({ id }).update(userData);
  }

  static async deleteById(id) {
    return db(this.tableName).where({ id }).del();
  }
}

export default UserModel;
