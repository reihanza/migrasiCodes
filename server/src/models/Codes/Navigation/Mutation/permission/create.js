const { Permission } = require("../../");

const createPermission = async (_, args, { user }) => {
  const sql = await Permission.query().insertAndFetch({ ...args });
  return sql;
};

module.exports = createPermission;
