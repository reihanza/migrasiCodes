const { Permission } = require("../../");

const updatePermission = async (_, args, { user }) => {
  const id = args.id;
  delete args.id;
  const sql = await Permission.query().updateAndFetchById(id, { ...args });
  return sql;
};

module.exports = updatePermission;
