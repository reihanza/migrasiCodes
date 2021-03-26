const { Menu } = require("../");
const get = async (_, args, { user }) => {
  let result = [];
  const data = await Menu.query().first()
  if(data){
      result = data
  }
  return result;
};
module.exports = get;
