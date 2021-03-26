const { Navigation } = require("../");

const getNavigation = async (_, args) => {
  let sql = [];
  if (typeof args === "undefined") {
    sql = await Navigation.query()
      .select("*")
      .where("parentid", "=", 0)
      .withGraphFetched("subnav.[subnav.[subnav]]")
      // .withGraphFetched("subnav.[subnav]")
      .orderBy("id", "asc")
      .first();
  } else {
    sql = await Navigation.query()
      .select("*")
      .where("parentid", "=", 0)
      .where({ ...args })
      .withGraphFetched("subnav.[subnav.[subnav]]")
      // .withGraphFetched("subnav.[subnav]")
      .orderBy("id", "asc")
      .first();
  }
  return sql;
};

module.exports = getNavigation;
