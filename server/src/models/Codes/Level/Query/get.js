const { Level } = require("../");
const get = async (_, args, { user }) => {
  let result = [];
  const data = await Level.query().first()
  if(data){
      result = data
  }
  return result;
};
module.exports = get;
