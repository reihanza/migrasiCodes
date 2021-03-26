const { Menu } = require("../");

const deleteMenu = async (_, args, { user }) => {
  const sql = await Menu.query().deleteById(args.id);
  return sql;
};

module.exports = deleteMenu;
