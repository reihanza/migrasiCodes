const { Order } = require("../");
// const { convertStringArray } = require("../../../../helpers/characters");

const getOrder = async (_, args, { user }) => {
  const data = await Order.query()
    .select("*")
    .where({ partnerid: user.id, ids: args.id })
    .withGraphFetched("partner")
    .withGraphFetched("product")
    // .withGraphFetched("package")
    .withGraphFetched("status_order")
    .withGraphFetched("bill")
    // .withGraphFetched("lease")
    .first();
  return data;
};

module.exports = getOrder;
