const { Navigation } = require("..");

const deleteNavigation = async (_, args) => {
  const sql = await Navigation.query().deleteById(args.id);
  console.log(sql)
  return sql;
};

module.exports = deleteNavigation;
