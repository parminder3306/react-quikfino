import DB from "../config/Database.js";

const query = {
  table: (table) => {
    return {
      // Find a single record based on a condition, or return null if not found
      findOne: async (condition, columns = ["*"]) => {
        return await DB(table).select(columns).where(condition).first();
      },

      // Find multiple records based on a condition
      findBy: async (condition, columns = ["*"]) => {
        return await DB(table).select(columns).where(condition);
      },

      // Get the count of records that match an OR condition
      orWithCount: async (condition) => {
        const [{ count }] = await DB(table)
          .orWhere(condition)
          .count("id as count");
        return parseInt(count, 10);
      },

      // Get the count of records that match an AND condition
      andWithCount: async (condition) => {
        const [{ count }] = await DB(table)
          .where(condition)
          .count("id as count");
        return parseInt(count, 10);
      },

      // Insert a new record into the table
      create: async (object) => {
        const [id] = await DB(table).insert(object);
        return id;
      },

      // Bulk insert multiple records into the table
      bulkCreate: async (objects) => {
        return await DB(table).insert(objects);
      },

      // Update records based on a condition
      update: async (condition, object) => {
        return await DB(table).where(condition).update(object);
      },

      // Bulk update records based on a condition
      bulkUpdate: async (condition, updateData) => {
        return await DB(table).where(condition).update(updateData);
      },

      // Delete records based on a condition
      delete: async (condition) => {
        return await DB(table).where(condition).del();
      },

      // Bulk delete records based on a condition
      bulkDelete: async (condition) => {
        return await DB(table).where(condition).del();
      },

      // Find a record based on a condition, or create it if it doesn't exist
      findOrCreate: async (condition, data) => {
        const recordCount = await query.table(table).orWithCount(condition);

        let recordData = null;

        if (!recordCount) {
          const id = await query.table(table).create(data);
          recordData = await query.table(table).findOne({ id });
        } else {
          recordData = await query.table(table).findOne(condition);
        }

        return { count: recordCount, record: recordData };
      },

      // Find a record based on a condition, or update it if it exists
      findOrUpdate: async (condition, data) => {
        const recordCount = await query.table(table).andWithCount(condition);

        let recordData = null;

        if (recordCount) {
          await query.table(table).update(condition, data);
          recordData = await query.table(table).findOne(condition);
        }

        return { count: recordCount, record: recordData };
      },

      // Find a record based on a condition, or delete it if it exists
      findOrDelete: async (condition, data) => {
        const recordCount = await query.table(table).andWithCount(condition);

        if (recordCount) {
          await query.table(table).delete(condition);
        }

        return { count: recordCount };
      },

      // Fetch a record, or throw an error if no record is found
      findOneOrFail: async (condition, columns = ["*"]) => {
        const record = await query.table(table).findOne(condition, columns);
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
        return await DB(table)
          .select(columns)
          .where(condition)
          .orderBy(sortBy, order);
      },

      // Pagination support for fetching records
      paginate: async (condition, page = 1, pageSize = 10, columns = ["*"]) => {
        const offset = (page - 1) * pageSize;
        const totalCount = await query.table(table).andWithCount(condition);
        const records = await DB(table)
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
        return await DB(table).where(condition).increment(field, value);
      },

      // Decrement a numeric field by a given value
      decrement: async (condition, field, value = 1) => {
        return await DB(table).where(condition).decrement(field, value);
      },

      // Get distinct values for a specific column
      distinct: async (column) => {
        return await DB(table).distinct(column);
      },

      // Perform aggregate functions like SUM, AVG, MAX, MIN, etc.
      aggregate: async (functionName, column) => {
        const result = await DB(table).select(
          DB.raw(`${functionName}(${column}) as value`)
        );
        return result[0].value;
      },

      // Perform SQL joins between tables
      joinWith: async (joinTable, joinCondition, columns = ["*"]) => {
        return await DB(table).select(columns).join(joinTable, joinCondition);
      },

      // Execute raw SQL queries
      rawQuery: async (queryString) => {
        return await DB.raw(queryString);
      },

      // Get the ID of the last inserted record
      getLastInsertedId: async () => {
        return await DB(table).max("id as id").first();
      },

      // Update a record if it exists, otherwise create a new one
      updateOrCreate: async (condition, data) => {
        const record = await query.table(table).findOne(condition);
        if (record) {
          await query.table(table).update(condition, data);
          return await query.table(table).findOne(condition);
        } else {
          return await query.table(table).create(data);
        }
      },

      // Create multiple records if they don't exist, otherwise return the existing ones
      findOrCreateMany: async (conditions, data) => {
        const existingRecords = [];
        const newRecords = [];

        for (const condition of conditions) {
          const recordCount = await query.table(table).orWithCount(condition);
          if (recordCount) {
            existingRecords.push(await query.table(table).findOne(condition));
          } else {
            const id = await query.table(table).create(data);
            newRecords.push(await query.table(table).findOne({ id }));
          }
        }

        return { existingRecords, newRecords };
      },
    };
  },
};

export default query;
