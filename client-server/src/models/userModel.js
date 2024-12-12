import db from "../config/dbConfig.js";

class UserModel {
  static tableName = "users";

  static async getAll() {
    return await db(this.tableName).select("*");
  }

  static async select(columns) {
    return await db(this.tableName).select(columns);
  }

  static async selectByCondition(columns = ["*"], condition = {}) {
    console.log("columns:", columns);
    console.log("condition:", condition);
    return await db(this.tableName).select(columns).where(condition);
  }

  static async create(userData) {
    const [id] = await db(this.tableName).insert(userData);
    return id;
  }

  static async update(condition, userData) {
    return await db(this.tableName).where(condition).update(userData);
  }

  static async delete(condition) {
    return await db(this.tableName).where(condition).del();
  }

  static async getPaginated(offset, limit) {
    return await db(this.tableName).select("*").offset(offset).limit(limit);
  }
}

export default UserModel;
