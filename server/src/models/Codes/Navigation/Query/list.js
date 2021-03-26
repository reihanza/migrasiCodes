const { Navigation } = require("../");

const listNavigation = async (_, args) => {
  let sql = [];
  if (typeof args === "undefined") {
    sql = await Navigation.query()
      .select("*")
      .where("parentid", "=", 0)
      .withGraphFetched("subnav.[subnav.[subnav]]")
      // .withGraphFetched("subnav.[subnav]")
      .orderBy("id", "asc");
  } else {
    sql = await Navigation.query()
      .select("*")
      .where("parentid", "=", 0)
      .where({ ...args })
      .withGraphFetched("subnav.[subnav.[subnav]]")
      // .withGraphFetched("subnav.[subnav]")
      .orderBy("id", "asc");
  }
  return sql;
};

module.exports = listNavigation;
