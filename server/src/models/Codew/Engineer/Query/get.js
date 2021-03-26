const { Engineer } = require("../");

const listEngineer = async (_, args) => {
  const sql = await Engineer.query()
    .select("*")
    .where({ ...args })
    .orderBy("id", "asc")
    .first();
  return sql;
};

module.exports = listEngineer;
