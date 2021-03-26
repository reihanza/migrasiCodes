const { StatusBill } = require("../../../");

const get = async (_, args, { user }) => {
  var result = [];
  result = await StatusBill.query()
    .where({ ...args })
    .first();
  return result;
};

module.exports = get;
