const { Database } = require("../");
const list = async (_, args, { user }) => {
  let result = [];
  const data = await Database.query()
  if(data){
      result = data
  }
  return result;
};
module.exports = list;
