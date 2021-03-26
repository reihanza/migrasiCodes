const { StatusOrder } = require("../../../");

const get = async (_, args, { user }) => {
  var result = [];
  result = await StatusOrder.query()
    .where({ ...args })
    .first();
  return result;
};

module.exports = get;
