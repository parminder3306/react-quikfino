import DB from "../config/Database.js";

const query = {
  table: (table) => {
    return {
      findOne: async (condition, columns = ["*"]) => {
        return await DB(table).select(columns).where(condition).first();
      },

      findAll: async (columns = ["*"]) => {
        return await DB(table).select(columns);
      },

      rowCount: async (condition = {}) => {
        const [{ count }] = await DB(table)
          .where(condition)
          .count("id as count");
        return parseInt(count, 10);
      },

      findOrCreate: async (condition, data) => {
        const recordCount = await this.rowCount(condition);

        let recordData = null;

        if (!recordCount) {
          const id = await this.create(data);
          recordData = await this.findOne({ id });
        }

        return { count: recordCount, record: recordData };
      },

      create: async (object) => {
        const [id] = await DB(table).insert(object);
        return id;
      },

      update: async (condition, object) => {
        return await DB(table).where(condition).update(object);
      },

      delete: async (condition) => {
        return await DB(table).where(condition).del();
      },
    };
  },
};

export default query;
