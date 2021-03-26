const { Permission } = require("../../");

const get = async (_, args, { user }) => {
  const data = await Permission.query()
    .select("*")
    .where({ ...args })
    .first();
  return data;
};

module.exports = get;
