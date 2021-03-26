const { Product } = require("../");
const list = async (_, args, { user }) => {
  let result;
  const data = await Product.query()
    .withGraphFetched("package(groupByPackage)")
    .modifiers({
      groupByPackage: (query) => query.modify("groupBy"),
    })
    .first();
  if (data) {
    result = data;
  }
  return result;
};
module.exports = list;
