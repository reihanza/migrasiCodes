const { Order, Lease, Bill, Package } = require("../../");
const { v4: uuidv44 } = require("uuid");
var dateFormat = require("dateformat");

const revision = async (_, args, { user }) => {
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
  var orderB = await Bill.query().where({ partner_orderid: order.id }).first();
  if (orderB) {
    // var orderB = order.bill;
    if (order.packageid == args.packageid && order.leaseid == args.leaseid) {
    } else {
      var dt = new Date();
      var dt1 = new Date(
        dateFormat(parseInt(order.start_date) * 1000, "mm/dd/yyyy")
      );
      var dt2 = new Date(
        dateFormat(parseInt(order.end_date) * 1000, "mm/dd/yyyy")
      );

      var diffOrderLast = Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
          Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate())) /
          (1000 * 60 * 60 * 24)
      );
      var diffNewOrder = Math.floor(
        (Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()) -
          Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
          (1000 * 60 * 60 * 24)
      );
      var diffOrder = Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
          Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
          (1000 * 60 * 60 * 24)
      );
      var hargaperday = orderB.payment / diffOrder;
      var hargasisa = hargaperday * diffOrderLast;
      var hasrg = hargaperday * diffOrder;
      // console.log(hargaperday, hargasisa, hasrg);

      var product = order.product;
      var _package = await Package.query()
        .where({
          productid: product.id,
          packageid: args.packageid,
        })
        .first();
      var _lease = await Lease.query().where({ leaseid: args.leaseid }).first();
      var _end_date = new Date();
      _end_date.setMonth(_end_date.getMonth() + parseInt(_lease.desc));
      var _pay = parseInt(_package.price) * parseInt(_lease.desc);
      var _disc = (_pay * parseInt(_lease.discount)) / 100;
      var _hasil = _pay - _disc;
      var fix = _hasil - hargasisa;
      var revision = 6;
      var status_bill = 3;
      if (args.packageid > order.packageid) {
        revision = 7;
        status_bill = 4;
      } else {
        if (args.leaseid > order.leaseid) {
          if (args.packageid >= order.packageid) {
            revision = 7;
            status_bill = 4;
          } else {
            revision = 6;
            status_bill = 3;
          }
        }
      }
      const insertRev = {
        ids: uuidv44(Date.now()),
        partnerid: order.partnerid,
        productid: order.productid,
        packageid: args.packageid,
        order_date: Date.now().toString().substring(0, Date.now().toString()),
        // start_date: Date.now().toString().substring(0, (Date.now().toString())),
        // end_date: Date.parse(_end_date).toString().substring(0, (Date.now().toString())),
        status_orderid: revision,
        leaseid: args.leaseid,
        // pay: fix,
        createdAt: Date.now().toString().substring(0, Date.now().toString()),
        updatedAt: Date.now().toString().substring(0, Date.now().toString()),
      };
      var revOrder = await Order.query().insertAndFetch(insertRev);
      if (revOrder) {
        const update = {
          // status_orderid: revision,
          updatedAt: Date.now().toString().substring(0, Date.now().toString()),
          rev_orderid: revOrder.id,
        };
        var updatedOrder = await Order.query()
          .where({ id: order.id })
          .update(update);
        if (updatedOrder) {
          var order_number =
            revOrder.id + " " + product.name + "|" + _package.name;
          const updateNumberRev = {
            order_number: order_number,
            updatedAt: Date.now()
              .toString()
              .substring(0, Date.now().toString()),
          };
          var updatedOrderRev = await Order.query()
            .where({ id: revOrder.id })
            .update(updateNumberRev);
          if (updatedOrderRev) {
            result = await Order.query()
              .where({ id: revOrder.id })
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
    }
  }
  result = order;
  //   var order = await codes('mer_partner_order').where({ ids: args.id, status_orderid: 5 }).first()
  return result;
};

module.exports = revision;
