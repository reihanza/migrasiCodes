const { code_w } = require("../../../config/database");
const { Model } = require("objection");

Model.knex(code_w);
class ModelEngineer extends Model {
  static get tableName() {
    return "nuc_engineer";
  }
}
const Engineer = ModelEngineer.bindKnex(code_w);
module.exports = {
  Engineer,
};
