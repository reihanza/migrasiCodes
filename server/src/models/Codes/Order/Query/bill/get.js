const { Bill } = require("../..");

const getBill = async (_, args, { user }) => {
  const data = await Bill.query()
    .select("*")
    .where({ ids: args.id })
    .withGraphFetched("status_bill")
    .first();
  return data;
};

module.exports = getBill;
