const { Model } = require("objection");
const { codes, code_w, code_i, code_v } = require("../../../config/database");

Model.knex(codes);

class ModelLevel extends Model {
  static get tableName() {
    return "nuc_acc_level";
  }
}
class ModelPartnerLevel extends Model {
  static get tableName() {
    return "mer_partner_level";
  }
}
Model.knex(code_w);
class ModelRolenav_codew extends Model {
  static get tableName() {
    return "mer_acc_rolenav";
  }
}
Model.knex(code_i);
class ModelRolenav_codei extends Model {
  static get tableName() {
    return "mer_acc_rolenav";
  }
}
Model.knex(code_w);
class ModelRolenav_codev extends Model {
  static get tableName() {
    return "mer_acc_rolenav";
  }
}
const Level = ModelLevel.bindKnex(codes);
const PartnerLevel = ModelPartnerLevel.bindKnex(codes);

const Rolenav_codew = ModelRolenav_codew.bindKnex(code_w);
const Rolenav_codei = ModelRolenav_codei.bindKnex(code_i);
const Rolenav_codev = ModelRolenav_codev.bindKnex(code_v);
module.exports = {
  Level,
  PartnerLevel,
  Rolenav_codew,
  Rolenav_codei,
  Rolenav_codev,
};
