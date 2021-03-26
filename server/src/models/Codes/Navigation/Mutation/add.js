const { Navigation } = require("../");

const addNavigation = async (_, args) => {
  const parent = await Navigation.query().findById(args.id);
  if (parent) {
    delete args.id;
    args.parentid = parent.id;
  }
  const sql = await Navigation.query()
    .insertAndFetch({ ...args })
    .withGraphFetched("subnav.[subnav.[subnav]]");
  return sql;
};

module.exports = addNavigation;
