const { Model } = require("objection");
const { codes } = require("../../../config/database");

Model.knex(codes);

class ModelDatabase extends Model {
  static get tableName() {
    return "nuc_db";
  }
  static get relationMappings() {
    return {
      product: {
        relation: Model.HasOneRelation,
        modelClass: ModelProduct,
        join: {
          from: "nuc_db.id",
          to: "nuc_product.id",
        },
      },
    };
  } 
}
class ModelProduct extends Model {
  static get tableName() {
    return "nuc_product";
  }
}
const Database = ModelDatabase.bindKnex(codes);
const Product = ModelProduct.bindKnex(codes);
module.exports = {
  Database,
  Product,
};
