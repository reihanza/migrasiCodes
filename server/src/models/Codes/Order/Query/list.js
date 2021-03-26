const { Order } = require("../");

const listOrder = async (_, args, { user }) => {
  const data = await Order.query()
    .select("*").where({partnerid: user.id})
    .withGraphFetched("partner")
    .withGraphFetched("product")
    // .withGraphFetched("package")
    .withGraphFetched("status_order")
    .withGraphFetched("bill")
    // .withGraphFetched("lease");
  return data;
};
      

module.exports = listOrder;
