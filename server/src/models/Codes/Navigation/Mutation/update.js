const { Navigation } = require("..");

const updateNavigation = async (_, args) => {
  const id = args.id;
  delete args.id;
  const sql = await Navigation.query()
    .updateAndFetchById(id, { ...args })
    .withGraphFetched("subnav.[subnav.[subnav]]");
  return sql;
};

module.exports = updateNavigation;
