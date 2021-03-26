const { Permission } = require("../../");

const deletePermission = async (_, args, { user }) => {
  const sql = await Permission.query().deleteById(args.id);
  return sql;
};

module.exports = deletePermission;
