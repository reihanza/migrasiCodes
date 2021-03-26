const { Menu } = require("../");
const list = async (_, args, { user }) => {
  let result = [];
  const data = await Menu.query()
  if(data){
      result = data
  }
  return result;
};
module.exports = list;
