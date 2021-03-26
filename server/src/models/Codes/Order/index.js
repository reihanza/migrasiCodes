const { Model } = require("objection");
const { codes, code_w, code_i, code_v } = require("../../../config/database");

Model.knex(codes);

class ModelOrder extends Model {
  static get tableName() {
    return "mer_partner_order";
  }
  static get relationMappings() {
    return {
      status_order: {
        relation: Model.HasOneRelation,
        modelClass: ModelStatusOrder,
        join: {
          from: "mer_partner_order.status_orderid",
          to: "nuc_status_order.id",
        },
      },
      partner: {
        relation: Model.HasOneRelation,
        modelClass: ModelPartner,
        join: {
          from: "mer_partner_order.partnerid",
          to: "nuc_partner.id",
        },
      },
      bill: {
        relation: Model.HasOneRelation,
        modelClass: ModelBill,
        join: {
          from: "mer_partner_order.id",
          to: "mer_partner_bill.partner_orderid",
        },
      },
      product: {
        relation: Model.HasOneRelation,
        modelClass: ModelProduct,
        join: {
          from: "mer_partner_order.productid",
          to: "nuc_product.id",
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
class ModelBill extends Model {
  static get tableName() {
    return "mer_partner_bill";
  }
  static get relationMappings() {
    return {
      status_bill: {
        relation: Model.HasOneRelation,
        modelClass: ModelStatusBill,
        join: {
          from: "mer_partner_bill.status_billid",
          to: "nuc_status_bill.id",
        },
      },
    };
  }
}
class ModelStatusBill extends Model {
  static get tableName() {
    return "nuc_status_bill";
  }
}
class ModelStatusOrder extends Model {
  static get tableName() {
    return "nuc_status_order";
  }
}
class ModelProduct extends Model {
  static get tableName() {
    return "nuc_product";
  }
}
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
class ModelAccount extends Model {
  static get tableName() {
    return "mer_account";
  }
}
class ModelLease extends Model {
  static get tableName() {
    return "v_lease";
  }
}
class ModelPackage extends Model {
  static get tableName() {
    return "v_package";
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
const Order = ModelOrder.bindKnex(codes);
const Partner = ModelPartner.bindKnex(codes);
const Bill = ModelBill.bindKnex(codes);
const StatusOrder = ModelStatusOrder.bindKnex(codes);
const StatusBill = ModelStatusBill.bindKnex(codes);
const Product = ModelProduct.bindKnex(codes);
const Lease = ModelLease.bindKnex(codes);
const Level = ModelLevel.bindKnex(codes);
const PartnerLevel = ModelPartnerLevel.bindKnex(codes);
const Account = ModelAccount.bindKnex(codes);
const Package = ModelPackage.bindKnex(codes);

const Rolenav_codew = ModelRolenav_codew.bindKnex(code_w);
const Rolenav_codei = ModelRolenav_codei.bindKnex(code_i);
const Rolenav_codev = ModelRolenav_codev.bindKnex(code_v);
module.exports = {
  Order,
  Partner,
  Bill,
  StatusOrder,
  StatusBill,
  Product,
  Lease,
  Level,
  Account,
  PartnerLevel,
  Package,
  Rolenav_codew,
  Rolenav_codei,
  Rolenav_codev,
};
