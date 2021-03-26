const { StatusBill } = require("../../../");

const list = async (_, args, { user }) => {
  var result = [];
  result = await StatusBill.query().where({ ...args });
  return result;
};

module.exports = list;
