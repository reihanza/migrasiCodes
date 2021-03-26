const { Order, Lease, Bill, Package } = require("../..");
const { v4: uuidv44 } = require("uuid");
var dateFormat = require("dateformat");

const process = async (_, args, { user }) => {
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
    var orderB = await Bill.query()
      .where({ partner_orderid: order.id })
      .first();
    var dt = new Date();
    var dt1 = new Date(
      dateFormat(parseInt(_order.start_date) * 1000, "mm/dd/yyyy")
    );
    var dt2 = new Date(
      dateFormat(parseInt(_order.end_date) * 1000, "mm/dd/yyyy")
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

    var _package = await Package.query()
      .where({
        productid: order.productid,
        packageid: order.packageid,
      })
      .first();
    var _lease = await Lease.query().where({ leaseid: order.leaseid }).first();
    var _end_date = new Date();
    _end_date.setMonth(_end_date.getMonth() + parseInt(_lease.desc));
    var _pay = parseInt(_package.price) * parseInt(_lease.desc);
    var _disc = (_pay * parseInt(_lease.discount)) / 100;
    var _hasil = _pay - _disc;
    var fix = _hasil - hargasisa;

    var revision = 6;
    var status_bill = 3;
    if (order.packageid > _order.packageid) {
      revision = 7;
      status_bill = 4;
    } else {
      if (order.leaseid > _order.leaseid) {
        // console.log("s")
        // revision = 6
        if (order.packageid >= _order.packageid) {
          revision = 7;
          status_bill = 4;
        } else {
          revision = 6;
          status_bill = 3;
        }
      }
    }
    var due_date = new Date();
    due_date.setHours(due_date.getHours() + 2);
    const insertBill = {
      ids: uuidv44(Date.now()),
      partner_orderid: order.id,
      payment: fix,
      payment_revision: hargasisa,
      status_billid: status_bill,
      due_date: Date.parse(due_date)
        .toString()
        .substring(0, Date.now().toString()),
      createdAt: Date.now().toString().substring(0, Date.now().toString()),
      updatedAt: Date.now().toString().substring(0, Date.now().toString()),
    };
    var billPartner = await Bill.query().insertAndFetch(insertBill);
    if (billPartner) {
      var partner = order.partnerid;
      var name = partner.name.toLowerCase();
      var _name = name.split(" ");
      _name = _name[0];
      if (_name.length >= 10) {
        _name = name.substr(0, 10);
      }
      var bill_number =
        billPartner +
        "-" +
        _name +
        "-" +
        dateFormat(parseInt(Date.now().toString()), "yymmdd");
      const updateNumber = {
        bill_number: bill_number,
        updatedAt: Date.now().toString().substring(0, Date.now().toString()),
      };
      if (
        await Bill.query().where({ id: billPartner.id }).update(updateNumber)
      ) {
        // var data = await codes('mer_partner_order').where({ id: order.id }).first()
        // result = data
        const updateRevision = {
          status_orderid: 3,
          updatedAt: Date.now().toString().substring(0, Date.now().toString()),
        };
        if (
          await Order.query().where({ id: order.id }).update(updateRevision)
        ) {
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
  }
  result = order;
  //   var order = await codes('mer_partner_order').where({ ids: args.id, status_orderid: 5 }).first()
  return result;
};

module.exports = process;
