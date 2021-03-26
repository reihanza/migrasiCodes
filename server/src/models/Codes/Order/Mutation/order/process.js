var dateFormat = require("dateformat");
const { Order, Bill } = require("../../");
const { v4: uuidv44 } = require("uuid");

const process = async (_, args, { user }) => {
  var result;
  var order = await Order.query()
    .where({ ids: args.id })
    .withGraphFetched("partner")
    .withGraphFetched("product")
    .withGraphFetched("package")
    .withGraphFetched("lease")
    .first();
  if (order) {
    var end_date = new Date();
    end_date.setMonth(end_date.getMonth() + parseInt(order.lease.desc));
    var pay = parseInt(order.package.price) * parseInt(order.lease.desc);
    var disc = (pay * parseInt(order.lease.discount)) / 100;
    var hasil = pay - disc;
    var due_date = new Date();
    due_date.setHours(due_date.getHours() + 2);
    const update = {
      status_orderid: 3,
      packageid: order.packageid,
      leaseid: order.lease.id,
      updatedAt: Date.now().toString().substring(0, Date.now().toString()),
    };
    if (await Order.query().where({ id: order.id }).update(update)) {
      const insertBill = {
        ids: uuidv44(Date.now()),
        partner_orderid: order.id,
        payment: hasil,
        status_billid: 1,
        due_date: Date.parse(due_date)
          .toString()
          .substring(0, Date.now().toString()),
        createdAt: Date.now().toString().substring(0, Date.now().toString()),
        updatedAt: Date.now().toString().substring(0, Date.now().toString()),
      };
      var billPartner = await Bill.query().insertAndFetch(insertBill);
      if (billPartner) {
        var name = order.partner.name.toLowerCase();
        var _name = name.split(" ");
        _name = _name[0];
        if (_name.length >= 10) {
          _name = name.substr(0, 10);
        }
        var bill_number =
          billPartner.id +
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
    }
  }
  return result;
};

module.exports = process;
