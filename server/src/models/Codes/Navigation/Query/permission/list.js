const { Permission } = require("../../");
const list = async (_, args, { user }) => {
  const data = await Permission.query()
    .select("*")
    .where({ ...args });
  return data;
};

module.exports = list;
