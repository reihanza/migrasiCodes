const { Order, Lease, Partner, Package, Product } = require("../../");
const { v4: uuidv44 } = require("uuid");

const create = async (_, args, { user }) => {
  var result;
  var partner = await Partner.query().where({ id: user.id }).first();
  var product = await Product.query()
    .where({
      ids: args.productid,
    })
    .first();
  var package = await Package.query()
    .where({
      productid: product.id,
      packageid: args.packageid,
    })
    .first();
  var lease = await Lease.query().where({ leaseid: args.leaseid }).first();
  var end_date = new Date();
  end_date.setMonth(end_date.getMonth() + parseInt(lease.desc));
  var pay = parseInt(package.price) * parseInt(lease.desc);
  var disc = (pay * parseInt(lease.discount)) / 100;
  var hasil = pay - disc;
  var ord = await Order.query()
    .where({
      partnerid: partner.id,
      productid: product.id,
    })
    .where("status_orderid", "<", 2)
    .first();
  if (ord) {
  } else {
    const insertOrder = {
      ids: uuidv44(Date.now()),
      partnerid: partner.id,
      productid: product.id,
      packageid: package.packageid,
      order_date: Date.now().toString().substring(0, Date.now().toString()),
      status_orderid: 1,
      leaseid: lease.id,
      createdAt: Date.now().toString().substring(0, Date.now().toString()),
      updatedAt: Date.now().toString().substring(0, Date.now().toString()),
    };
    var newOrder = await Order.query().insertAndFetch(insertOrder);
    if (newOrder) {
      var order_number = newOrder.id + " " + product.name + "|" + package.name;
      const updateNumber = {
        order_number: order_number,
        updatedAt: Date.now().toString().substring(0, Date.now().toString()),
      };
      var updatedOrder = await Order.query()
        .where({ id: newOrder.id })
        .update(updateNumber);
      if (updatedOrder) {
        result = await Order.query()
          .where({ id: newOrder.id })
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
  return result;
};

module.exports = create;
