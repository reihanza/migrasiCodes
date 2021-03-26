const { Order, Lease, Partner, Package, Product } = require("../../");
const cart = async (_, args, { user }) => {
  var result;
  var order = await Order.query()
    .where({ ids: args.id })
    .withGraphFetched("partner")
    .withGraphFetched("product")
    .withGraphFetched("status_order")
    .first();
  if (order) {
    var package = await Package.query()
      .where({
        productid: order.productid,
        packageid: args.packageid,
      })
      .first();
    var lease = await Lease.query().where({ leaseid: order.leaseid }).first();
    var end_date = new Date();
    end_date.setMonth(end_date.getMonth() + parseInt(lease.desc));
    var pay = parseInt(package.price) * parseInt(lease.desc);
    var disc = (pay * parseInt(lease.discount)) / 100;
    var hasil = pay - disc;
    var due_date = new Date();
    due_date.setHours(due_date.getHours() + 2);
    const update = {
      status_orderid: 2,
      packageid: package.packageid,
      leaseid: lease.id,
      updatedAt: Date.now().toString().substring(0, Date.now().toString()),
    };
    if (await Order.query().where({ id: order.id }).update(update)) {
      result = await Order.query()
        .where({ id: order.id })
        .withGraphFetched("partner")
        .withGraphFetched("product")
        .withGraphFetched("package")
        .withGraphFetched("lease")
        .withGraphFetched("bill")
        .withGraphFetched("status_order")
        .first();
    }
  }
  return result;
};

module.exports = cart;
