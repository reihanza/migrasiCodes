const { Permission } = require("../../");

const activePermission = async (_, args, { user }) => {
  const id = args.id;
  delete args.id;
  const perm = await Permission.query().where({ id: id }).first();
  args.active = 1;
  if (perm.active) {
    args.active = 0;
  }
  const sql = await Permission.query().updateAndFetchById(id, { ...args });
  return sql;
};

module.exports = activePermission;
