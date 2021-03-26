const { code_w } = require("../../../config/database");
const { Model } = require("objection");

Model.knex(code_w);
class ModelProject extends Model {
  static get tableName() {
    return "nuc_project";
  }
}
const Project = ModelProject.bindKnex(code_w);
module.exports = {
  Project,
};
