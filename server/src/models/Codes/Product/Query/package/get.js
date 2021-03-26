const { Package } = require("../../");
const list = async (_, args, { user }) => {
  let result;
  const data = await Package.query().groupBy("id").first();
  if (data) {
    result = data;
  }
  return result;
};
module.exports = list;
