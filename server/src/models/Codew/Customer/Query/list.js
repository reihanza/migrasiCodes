const { Customer } = require("../");

const listCustomer = async (_, args) => {
  const sql = await Customer.query()
    .select("*")
    .where({ ...args })
    .orderBy("id", "asc");
  return sql;
};

module.exports = listCustomer;
