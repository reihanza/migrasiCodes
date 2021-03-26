const { Owner } = require("../");

const listOwner = async (_, args) => {
  const sql = await Owner.query()
    .select("*")
    .where({ ...args })
    .orderBy("id", "asc")
    .first();
  return sql;
};

module.exports = listOwner;
