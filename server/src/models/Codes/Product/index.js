const { Model } = require("objection");
const { codes } = require("../../../config/database");

Model.knex(codes);
class ModelProduct extends Model {
  static get tableName() {
    return "nuc_product";
  }
  static get relationMappings() {
    return {
      package: {
        relation: Model.HasManyRelation,
        modelClass: ModelPackage,
        join: {
          from: "v_packnav.productid",
          to: "nuc_product.id",
        },
      },
    };
  }
}
class ModelPackage extends Model {
  static get tableName() {
    return "v_packnav";
  }
  static get modifiers() {
    return {
      groupBy(query) {
        query.groupBy("productid", "id");
      },
    };
  }
}
const Product = ModelProduct.bindKnex(codes);
const Package = ModelPackage.bindKnex(codes);
module.exports = {
  Product,
  Package,
};
