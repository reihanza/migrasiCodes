const { Owner } = require("../");

const listOwner = async (_, args) => {
  const sql = await Owner.query()
    .select("*")
    .where({ ...args })
    .orderBy("id", "asc");
  return sql;
};

module.exports = listOwner;
