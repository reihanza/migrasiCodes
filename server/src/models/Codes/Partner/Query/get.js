const { Partner, PartnerOrder, Product } = require("../");

const getPartner = async (_, args, { user }) => {
  const data = await Partner.query()
    .select("*")
    .where({ ...args })
    .where({ id: user.id })
    .first();
  if (data) {
    var due_date = new Date();
    var dates = Date.parse(due_date)
      .toString()
      .substring(0, Date.now().toString().length - 3);
    const actived = await PartnerOrder.query()
      .select("*")
      .where({ partnerid: user.id })
      .where("start_date", "<", dates)
      .where("end_date", ">", dates)
      .whereIn("status_orderid", [5, 8])
      
      .withGraphFetched("product")
      .withGraphFetched("package")
      .withGraphFetched("status_order");
    var prodid = [];
    for (let index = 0; index < actived.length; index++) {
      prodid.push(actived[index].productid);
    }
    const cart = await PartnerOrder.query()
      .select("*")
      .where({ partnerid: user.id })
      .where("order_date", "<", dates)
      .where("status_orderid", 1)
      
      .withGraphFetched("product")
      .withGraphFetched("package")
      .withGraphFetched("status_order");
    const inv = await PartnerOrder.query()
      .select("*")
      .where({ partnerid: user.id })
      .where("order_date", "<", dates)
      .whereNotIn("status_orderid", [0, 1, 5])
      
      .withGraphFetched("product")
      .withGraphFetched("package")
      .withGraphFetched("status_order");
    // const product = await PartnerOrder.query()
    //   .select("*")
    //   .where({ partnerid: user.id })
    //   .where("order_date", "<", dates)
    //   .whereNotIn("status_orderid", [0, 1, 5])
    //   
    //   .withGraphFetched("product")
    //   .withGraphFetched("package")
    //   .withGraphFetched("status_order");
    // var _dataForProduct = await codes("mer_partner_order")
    //   .where({ partnerid: user.id, productid: product[index].id })
    //   .where("order_date", "<", dates)
    //   .first();
    var product = await Product.query().select("*").whereNotIn("id", prodid);
    // console.log(prodid);
    var dashboard = {
      active: actived,
      cart: cart,
      order: inv,
      product: product,
    };
    data.dashboard = dashboard;
  }
  return data;
};

module.exports = getPartner;
