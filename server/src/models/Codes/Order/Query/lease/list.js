const { Lease } = require("../..");

const listLease = async (_, args, { user }) => {
  var result = [];
  result = await Lease.query().where({ ...args });
  return result;
};

module.exports = listLease;
