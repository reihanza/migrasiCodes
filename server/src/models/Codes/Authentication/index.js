const { Model } = require("objection");
const { codes } = require("../../../config/database");

Model.knex(codes);

class ModelAccount extends Model {
  static get tableName() {
    return "mer_account";
  }
}
class ModelPartner extends Model {
  static get tableName() {
    return "nuc_partner";
  }
}
class ModelOrder extends Model {
  static get tableName() {
    return "mer_partner_order";
  }
}
const Account = ModelAccount.bindKnex(codes);
const Partner = ModelPartner.bindKnex(codes);
const Order = ModelOrder.bindKnex(codes);
module.exports = {
  Account,
  Partner,
  Order,
};
