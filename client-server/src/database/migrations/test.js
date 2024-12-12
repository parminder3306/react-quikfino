const up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").unique().notNullable();
    table.timestamps(true, true); // adds created_at and updated_at
  });
};

const down = (knex) => {
  return knex.schema.dropTable("users");
};

export { up, down };
