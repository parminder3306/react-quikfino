import DB from "../config/Database.js";

class UserModel {
  static tableName = "users";

  // Find a single record by condition
  static async findOne(condition, columns = ["*"]) {
    return await DB(this.tableName).select(columns).where(condition).first();
  }

  // Find all records or matching records by condition
  static async findAll(condition = {}, columns = ["*"]) {
    return await DB(this.tableName).select(columns).where(condition);
  }

  // Insert a new record
  static async create(data) {
    const [id] = await DB(this.tableName).insert(data).returning("id");
    return id;
  }

  // Update existing records by condition
  static async update(condition, data) {
    return await DB(this.tableName).where(condition).update(data);
  }

  // Delete records by condition
  static async delete(condition) {
    return await DB(this.tableName).where(condition).del();
  }

  // Find by primary key
  static async findById(id, columns = ["*"]) {
    return await DB(this.tableName).select(columns).where({ id }).first();
  }

  // Count rows matching a condition
  static async count(condition = {}) {
    const [{ count }] = await DB(this.tableName)
      .where(condition)
      .count("id as count");
    return parseInt(count, 10);
  }

  // Find or create a record
  static async findOrCreate(condition, data) {
    const recordCount = await this.count(condition);

    let recordData = null;

    if (!recordCount) {
      const id = await this.create(data);
      recordData = await this.findOne({ id });
    }

    return { count: recordCount, record: recordData };
  }

  // Find all records and count them
  static async findAndCountAll(condition = {}, columns = ["*"]) {
    const results = await this.findAll(condition, columns);
    const totalCount = await this.count(condition);
    return { count: totalCount, rows: results };
  }
}

export default UserModel;
