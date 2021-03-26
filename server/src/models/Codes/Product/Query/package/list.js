const { Package } = require("../../");
const list = async (_, args, { user }) => {
  let result = [];
  const data = await Package.query().groupBy("id");
  if (data) {
    result = data;
  }
  return result;
};
module.exports = list;
