const { code_w } = require("../../../config/database");
const { Model } = require("objection");

Model.knex(code_w);
class ModelOwner extends Model {
  static get tableName() {
    return "nuc_owner";
  }
  static get relationMappings() {
    return {
      project: {
        relation: Model.HasOneRelation,
        modelClass: ModelProject,
        join: {
          from: "nuc_project.id",
          to: "nuc_owner.projectid",
        },
      },
    };
  }
}
class ModelProject extends Model {
    static get tableName() {
      return "nuc_project";
    }
  }
const Owner = ModelOwner.bindKnex(code_w);
const Project = ModelProject.bindKnex(code_w);
module.exports = {
  Owner,
  Project,
};
