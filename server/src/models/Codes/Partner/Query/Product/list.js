const { PartnerOrder } = require("../../");

const listProductActive = async (_, args, { user }) => {
  var due_date = new Date();
  var dates = Date.parse(due_date)
    .toString()
    .substring(0, Date.now().toString().length - 3);
  const data = await PartnerOrder.query()
    .select("*")
    .where({ partnerid: user.id })
    .whereIn("status_orderid", [5, 8])
    .where('end_date', '>', dates)
    // .withGraphFetched("partner")
    .withGraphFetched("product")
    .withGraphFetched("package")
    .withGraphFetched("status_order")
    // .withGraphFetched("bill")
    // .withGraphFetched("lease");
  return data;
};

module.exports = listProductActive;