const { Order, Bill } = require("../..");

const pay = async (_, args, { user }) => {
  var result;
  var order = await Order.query()
    .where({ ids: args.id })
    .withGraphFetched("partner")
    .withGraphFetched("product")
    .withGraphFetched("package")
    .withGraphFetched("lease")
    .withGraphFetched("bill")
    .withGraphFetched("status_order")
    .first();
  if (order) {
    var bill = await Bill.query().where({ partner_orderid: order.id }).first();
    if (bill) {
      const update = {
        status_billid: 2,
        payment_date: Date.now()
          .toString()
          .substring(0, Date.now().toString().length - 3),
        updatedAt: Date.now()
          .toString()
          .substring(0, Date.now().toString().length - 3),
      };
      if (await Bill.query().where({ id: bill.id }).update(update)) {
        const updateOrder = {
          status_orderid: 4,
          updatedAt: Date.now()
            .toString()
            .substring(0, Date.now().toString().length - 3),
        };
        if (await Order.query().where({ id: order.id }).update(updateOrder)) {
          result = await Order.query()
            .where({ ids: args.id })
            .withGraphFetched("partner")
            .withGraphFetched("product")
            .withGraphFetched("package")
            .withGraphFetched("lease")
            .withGraphFetched("status_order")
            .withGraphFetched("bill")
            .first();
        }
      }
    }
  }
  result = order;
  //   var order = await codes('mer_partner_order').where({ ids: args.id, status_orderid: 5 }).first()
  return result;
};

module.exports = pay;
