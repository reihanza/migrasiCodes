const { Order, Lease, Bill, Package } = require("../..");

const confirm = async (_, args, { user }) => {
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
    var _order = await Order.query().where({ rev_orderid: order.id }).first();
    var bill = await Bill.query().where({ partner_orderid: order.id }).first();
    var product = order.product;
    var _package = await Package.query()
      .where({
        productid: order.productid,
        packageid: order.packageid,
      })
      .first();
    var _lease = await Lease.query().where({ leaseid: order.leaseid }).first();
    var _end_date = new Date();
    _end_date.setMonth(_end_date.getMonth() + parseInt(_lease.desc));
    var revision = 6;
    if (order.packageid > _order.packageid) {
      revision = 7;
    } else {
      if (order.leaseid > _order.leaseid) {
        // console.log("s")
        // revision = 6
        if (order.packageid >= _order.packageid) {
          revision = 7;
        } else {
          revision = 6;
        }
      }
    }
    const updateOld = {
      status_orderid: revision,
      start_date: Date.now().toString().substring(0, Date.now().toString()),
      end_date: Date.parse(_end_date)
        .toString()
        .substring(0, Date.now().toString()),
      updatedAt: Date.now().toString().substring(0, Date.now().toString()),
    };
    if (await Oder.query().where({ id: _order.id }).update(updateOld)) {
      const update = {
        status_orderid: 5,
        updatedAt: Date.now().toString().substring(0, Date.now().toString()),
      };
      if (await Order.query().where({ id: order.id }).update(update)) {
        result = await Order.query()
          .where({ ids: args.id })
          .withGraphFetched("partner")
          .withGraphFetched("product")
          .withGraphFetched("package")
          .withGraphFetched("lease")
          .withGraphFetched("bill")
          .withGraphFetched("status_order")
          .first();
      }
    }
  }
  //   var order = await codes('mer_partner_order').where({ ids: args.id, status_orderid: 5 }).first()
  return result;
};
