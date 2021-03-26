const { Menu } = require("../");

const activeMenu = async (_, args, { user }) => {
  const id = args.id;
  delete args.id;
  const menu = await Menu.query().where({ id: id }).first();
  args.active = 1;
  if (menu.active) {
    args.active = 0;
  }
  const sql = await Menu.query().updateAndFetchById(id, { ...args });
  return sql;
};

module.exports = activeMenu;
