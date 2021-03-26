const { code_w } = require("../../../config/database");
const { Model } = require("objection");

Model.knex(code_w);
class ModelCustomer extends Model {
  static get tableName() {
    return "nuc_customer";
  }
  static get relationMappings() {
    return {
      project: {
        relation: Model.HasOneRelation,
        modelClass: ModelProject,
        join: {
          from: "nuc_project.id",
          to: "nuc_customer.projectid",
        },
      },
      owner: {
        relation: Model.HasOneRelation,
        modelClass: ModelOwner,
        join: {
          from: "nuc_owner.id",
          to: "nuc_customer.ownerid",
        },
      },
    };
  }
}
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
const Customer = ModelCustomer.bindKnex(code_w);
const Owner = ModelOwner.bindKnex(code_w);
const Project = ModelProject.bindKnex(code_w);
module.exports = {
  Customer,
  Owner,
  Project,
};
