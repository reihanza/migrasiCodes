const { Navigation } = require("../");

const insertNavigation = async (_, args) => {
  const sql = await Navigation.query()
    .insertAndFetch({ ...args })
    .withGraphFetched("subnav.[subnav.[subnav]]");
  return sql;
};

module.exports = insertNavigation;
