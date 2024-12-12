import db from "../config/dbConfig.js";

class TransactionModel {
  static tableName = "transactions";

  static async getAll() {
    return db(this.tableName).select("*");
  }

  static async getById(id) {
    return db(this.tableName).where({ id }).first();
  }

  static async create(transactionData) {
    const [id] = await db(this.tableName).insert(transactionData);
    return id;
  }

  static async updateById(id, transactionData) {
    return db(this.tableName).where({ id }).update(transactionData);
  }

  static async deleteById(id) {
    return db(this.tableName).where({ id }).del();
  }
}

export default TransactionModel;
