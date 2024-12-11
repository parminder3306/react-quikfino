// Import the database instance
import { db } from "./db";

/**
 * User Model: Provides methods to interact with the `users` table.
 */
class UserModel {
  static tableName = "users";

  /**
   * Fetch all users.
   * @returns {Promise<Array>} List of users.
   */
  static async getAll() {
    return db(this.tableName).select("*");
  }

  /**
   * Fetch a user by ID.
   * @param {number} id - User ID.
   * @returns {Promise<Object|null>} The user object or null if not found.
   */
  static async getById(id) {
    return db(this.tableName).where({ id }).first();
  }

  /**
   * Create a new user.
   * @param {Object} userData - Data for the new user.
   * @returns {Promise<number>} The ID of the created user.
   */
  static async create(userData) {
    const [id] = await db(this.tableName).insert(userData);
    return id;
  }

  /**
   * Update a user by ID.
   * @param {number} id - User ID.
   * @param {Object} userData - Updated user data.
   * @returns {Promise<number>} Number of rows updated.
   */
  static async updateById(id, userData) {
    return db(this.tableName).where({ id }).update(userData);
  }

  /**
   * Delete a user by ID.
   * @param {number} id - User ID.
   * @returns {Promise<number>} Number of rows deleted.
   */
  static async deleteById(id) {
    return db(this.tableName).where({ id }).del();
  }
}

export default UserModel;
