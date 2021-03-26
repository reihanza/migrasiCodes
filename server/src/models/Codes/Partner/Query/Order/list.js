const { PartnerOrder } = require("../../");

const listPartnerOrder = async (_, args, { user }) => {
  const data = await PartnerOrder.query()
    .select("*").where({partnerid: user.id})
    // .withGraphFetched("partner")
    // .withGraphFetched("product")
    // .withGraphFetched("package")
    // .withGraphFetched("status_order")
    // .withGraphFetched("bill")
    // .withGraphFetched("lease");
  return data;
};
      

module.exports = listPartnerOrder;
