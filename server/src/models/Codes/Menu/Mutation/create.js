const { Menu } = require("../");

const createMenu = async (_, args, { user }) => {
  const sql = await Menu.query().insertAndFetch({ ...args });
  return sql;
};

module.exports = createMenu;
