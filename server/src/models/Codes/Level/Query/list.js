const { Level } = require("../");
const list = async (_, args, { user }) => {
  let result = [];
  const data = await Level.query()
  if(data){
      result = data
  }
  return result;
};
module.exports = list;
