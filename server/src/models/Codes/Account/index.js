const { Model } = require("objection");
const { codes } = require("../../../config/database");

Model.knex(codes);

class ModelAccount extends Model {
  static get tableName() {
    return "mer_account";
  }
  static get relationMappings() {
    return {
      partner: {
        relation: Model.HasOneRelation,
        modelClass: ModelPartner,
        join: {
            from: "nuc_partner.id",
            to: "mer_account.partnerid",
          },
      },
    };
  }
}
class ModelPartner extends Model {
  static get tableName() {
    return "nuc_partner";
  }
}
const Account = ModelAccount.bindKnex(codes);
const Partner = ModelPartner.bindKnex(codes);
module.exports = {
  Account,
  Partner,
};
