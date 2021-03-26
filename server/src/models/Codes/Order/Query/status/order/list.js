const { StatusOrder } = require("../../../");

const list = async (_, args, { user }) => {
  var result = [];
  result = await StatusOrder.query().where({ ...args });
  return result;
};

module.exports = list;
