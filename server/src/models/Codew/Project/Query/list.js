const { Project } = require("../");

const listProject = async (_, args) => {
  const sql = await Project.query()
    .select("*")
    .where({ ...args })
    .orderBy("id", "asc");
  return sql;
};

module.exports = listProject;
