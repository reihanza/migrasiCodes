const { Project } = require("../");

const listProject = async (_, args) => {
  const sql = await Project.query()
    .select("*")
    .where({ ...args })
    .orderBy("id", "asc")
    .first(0);
  return sql;
};

module.exports = listProject;
