const { Model } = require("objection");
const { codes } = require("../../../config/database");

Model.knex(codes);

class ModelNavigation extends Model {
  static get tableName() {
    return "nuc_acc_navigation";
  }
  static get relationMappings() {
    return {
      subnav: {
        relation: Model.HasManyRelation,
        modelClass: ModelNavigation,
        join: {
          from: "nuc_acc_navigation.id",
          to: "nuc_acc_navigation.parentid",
        },
      },
    };
  }
}
class ModelPermission extends Model {
  static get tableName() {
    return "nuc_acc_permission";
  }
}
const Navigation = ModelNavigation.bindKnex(codes);
const Permission = ModelPermission.bindKnex(codes);
module.exports = {
  Navigation,
  Permission,
};
