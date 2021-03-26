const { Lease } = require("../..");

const getLease = async (_, args, { user }) => {
  var result = [];
  result = await Lease.query()
    .where({ ...args })
    .first();
  return result;
};

module.exports = getLease;
