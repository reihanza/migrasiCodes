const {
  Order,
} = require("../../");

const close = async (_, args, { user }) => {
  var result;
  var order = await Order.query()
    .where({ ids: args.id })
    .withGraphFetched("partner")
    .withGraphFetched("product")
    .withGraphFetched("package")
    .first();
    console.log(order)
  if (order) {
    if (order.status_orderid == 1) {
      if (await Order.query().where({ id: order.id }).del()) {
        result = true;
      } else {
        if (
          await Order.query()
            .where({ id: order.id })
            .update({
              status_orderid: 0,
              updatedAt: Date.now()
                .toString()
                .substring(0, Date.now().toString()),
            })
        ) {
          result = true;
        }
      }
    }
  }
  return result;
};

module.exports = close;
