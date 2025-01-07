import database from "../config/Database.js";

const db = {
  table: (table) => {
    return {
      // Find a single record based on a condition, or return null if not found
      findOne: async (condition, columns = ["*"]) => {
        return await database(table).select(columns).where(condition).first();
      },

      // Find multiple records based on a condition
      findBy: async (condition, columns = ["*"]) => {
        return await database(table).select(columns).where(condition);
      },

      // Get the count of records that match an OR condition
      orWithCount: async (condition) => {
        const [{ count }] = await database(table)
          .orWhere(condition)
          .count("id as count");
        return parseInt(count, 10);
      },

      // Get the count of records that match an AND condition
      andWithCount: async (condition) => {
        const [{ count }] = await database(table)
          .where(condition)
          .count("id as count");
        return parseInt(count, 10);
      },

      // Insert a new record into the table
      create: async (data) => {
        const [id] = await database(table).insert(data);
        return id;
      },

      // Bulk insert multiple records into the table
      bulkCreate: async (data) => {
        return await database(table).insert(data);
      },

      // Update records based on a condition
      update: async (condition, data) => {
        return await database(table).where(condition).update(data);
      },

      // Bulk update records based on a condition
      bulkUpdate: async (condition, updateData) => {
        return await database(table).where(condition).update(updateData);
      },

      // Delete records based on a condition
      delete: async (condition) => {
        return await database(table).where(condition).del();
      },

      // Bulk delete records based on a condition
      bulkDelete: async (condition) => {
        return await database(table).where(condition).del();
      },

      // Find a record based on a condition, or create it if it doesn't exist
      findOrCreate: async (condition, data) => {
        const recordCount = await db.table(table).orWithCount(condition);

        let recordData = null;

        if (!recordCount) {
          const id = await db.table(table).create(data);
          recordData = await db.table(table).findOne({ id });
        } else {
          recordData = await db.table(table).findOne(condition);
        }

        return { count: recordCount, record: recordData };
      },

      createOrRecord: async (data) => {
        const id = await db.table(table).create(data);
        return await db.table(table).findOne({ id });
      },

      // Find a record based on a condition, or update it if it exists
      findOrUpdate: async (condition, data) => {
        const recordCount = await db.table(table).andWithCount(condition);

        let recordData = null;

        if (recordCount) {
          await db.table(table).update(condition, data);
          recordData = await db.table(table).findOne(condition);
        }

        return { count: recordCount, record: recordData };
      },

      // Find a record based on a condition, or delete it if it exists
      findOrDelete: async (condition) => {
        const recordCount = await db.table(table).andWithCount(condition);

        if (recordCount) {
          await db.table(table).delete(condition);
        }

        return { count: recordCount };
      },

      // Fetch a record, or throw an error if no record is found
      findOneOrFail: async (condition, columns = ["*"]) => {
        const record = await db.table(table).findOne(condition, columns);
        if (!record) {
          throw new Error(
            `Record not found for condition: ${JSON.stringify(condition)}`
          );
        }
        return record;
      },

      // Fetch records with sorting by a given column
      findAndSort: async (
        condition,
        sortBy,
        order = "asc",
        columns = ["*"]
      ) => {
        return await database(table)
          .select(columns)
          .where(condition)
          .orderBy(sortBy, order);
      },

      // Pagination support for fetching records
      paginate: async (condition, page = 1, pageSize = 10, columns = ["*"]) => {
        const offset = (page - 1) * pageSize;
        const totalCount = await db.table(table).andWithCount(condition);
        const records = await database(table)
          .select(columns)
          .where(condition)
          .offset(offset)
          .limit(pageSize);

        return {
          total: totalCount,
          data: records,
          page,
          pageSize,
          totalPages: Math.ceil(totalCount / pageSize),
        };
      },

      // Increment a numeric field by a given value
      increment: async (condition, field, value = 1) => {
        return await database(table).where(condition).increment(field, value);
      },

      // Decrement a numeric field by a given value
      decrement: async (condition, field, value = 1) => {
        return await database(table).where(condition).decrement(field, value);
      },

      // Get distinct values for a specific column
      distinct: async (column) => {
        return await database(table).distinct(column);
      },

      // Perform aggregate functions like SUM, AVG, MAX, MIN, etc.
      aggregate: async (functionName, column) => {
        const result = await database(table).select(
          database.raw(`${functionName}(${column}) as value`)
        );
        return result[0].value;
      },

      // Perform SQL joins between tables
      andWithJoin: async (
        joinTable,
        joinCondition,
        condition,
        columns = ["*"]
      ) => {
        return await database(table)
          .select(columns)
          .leftJoin(joinTable, joinCondition)
          .where(condition);
      },

      orWithJoin: async (
        joinTable,
        joinCondition,
        condition,
        columns = ["*"]
      ) => {
        return await database(table)
          .select(columns)
          .leftJoin(joinTable, joinCondition)
          .orWhere(condition);
      },

      // Execute raw SQL queries
      rawQuery: async (queryString) => {
        return await database.raw(queryString);
      },

      // Get the ID of the last inserted record
      getLastInsertedId: async () => {
        return await database(table).max("id as id").first();
      },

      // Update a record if it exists, otherwise create a new one
      updateOrCreate: async (condition, data) => {
        const record = await db.table(table).findOne(condition);
        if (record) {
          await db.table(table).update(condition, data);
          return await db.table(table).findOne(condition);
        } else {
          return await db.table(table).create(data);
        }
      },

      // Create multiple records if they don't exist, otherwise return the existing ones
      findOrCreateMany: async (conditions, data) => {
        const existingRecords = [];
        const newRecords = [];

        for (const condition of conditions) {
          const recordCount = await db.table(table).orWithCount(condition);
          if (recordCount) {
            existingRecords.push(await db.table(table).findOne(condition));
          } else {
            const id = await db.table(table).create(data);
            newRecords.push(await db.table(table).findOne({ id }));
          }
        }

        return { existingRecords, newRecords };
      },
    };
  },
};

export default db;
