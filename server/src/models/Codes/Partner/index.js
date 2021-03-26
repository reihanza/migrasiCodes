const { Model } = require("objection");
const { codes } = require("../../../config/database");

Model.knex(codes);
class ModelPartner extends Model {
  static get tableName() {
    return "nuc_partner";
  }
  static get relationMappings() {
    return {
      order: {
        relation: Model.HasManyRelation,
        modelClass: ModelPartnerOrder,
        join: {
          from: "mer_partner_order.partnerid",
          to: "nuc_partner.id",
        },
      },
    };
  }
}
class ModelPartnerLevel extends Model {
  static get tableName() {
    return "mer_partner_level";
  }
}
class ModelPartnerOrder extends Model {
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
      package: {
        relation: Model.HasOneRelation,
        modelClass: ModelPackage,
        join: {
          from: "mer_partner_order.packageid",
          to: "v_package.packageid",
        },
      },
    };
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
const Partner = ModelPartner.bindKnex(codes);
const PartnerOrder = ModelPartnerOrder.bindKnex(codes);
const PartnerLevel = ModelPartnerLevel.bindKnex(codes);
const PartnerBill = ModelBill.bindKnex(codes);
const StatusOrder = ModelStatusOrder.bindKnex(codes);
const StatusBill = ModelStatusBill.bindKnex(codes);
const Product = ModelProduct.bindKnex(codes);
const Lease = ModelLease.bindKnex(codes);
const Level = ModelLevel.bindKnex(codes);
const Account = ModelAccount.bindKnex(codes);
const Package = ModelPackage.bindKnex(codes);
module.exports = {
  Partner,
  PartnerOrder,
  PartnerLevel,
  PartnerBill,
  StatusOrder,
  StatusBill,
  Product,
  Lease,
  Level,
  Account,
  Package,
};
