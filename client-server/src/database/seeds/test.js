const seed = (knex) => {
  return knex("users")
    .del()
    .then(() => {
      return knex("users").insert([
        { name: "John Doe", email: "john.doe@example.com" },
        { name: "Jane Smith", email: "jane.smith@example.com" },
      ]);
    });
};
