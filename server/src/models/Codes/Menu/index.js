const { Model } = require("objection");
const { codes } = require("../../../config/database");

Model.knex(codes);

class ModelMenu extends Model {
  static get tableName() {
    return "nuc_menu";
  }
}
const Menu = ModelMenu.bindKnex(codes);
module.exports = {
  Menu,
};
