const { Menu } = require("../");

const updateMenu = async (_, args, { user }) => {
  const id = args.id;
  delete args.id;
  const sql = await Menu.query().updateAndFetchById(id, { ...args });
  return sql;
};

module.exports = updateMenu;
