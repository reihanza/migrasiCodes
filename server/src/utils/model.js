const { Model } = require("objection");
const { codes } = require("../config/database");

Model.knex(codes);
class ModelPartner extends Model {
  static get tableName() {
    return "nuc_partner";
  }
}
const Partner = ModelPartner.bindKnex(codes);
module.exports = {
  Partner,
};
