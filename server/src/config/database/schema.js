const { codes, code_w, code_i, code_v } = require("./");

const schmeaTablePartner = async (data, product) => {
  var model;
  switch (product) {
    case 1:
      model = code_w;
      break;
    case 2:
      model = code_i;
      break;
    case 3:
      model = code_v;
      break;

    default:
      break;
  }
  await tablePartnerRequest(data, model);
  await tablePartnerPO(data, model);
  await tablePartnerPN(data, model);
  await tablePartnerSN(data, model);
  await tablePartnerDelivery(data, model);
  await tablePartnerUploadDoc(data, model);
  await tablePartnerDocBound(data, model);
};

const tablePartnerPO = async (data, model) => {
  model.schema
    .hasTable(data.label + "_mer_purchase_order")
    .then(function (exists) {
      if (!exists) {
        return model.schema.createTable(
          data.label + "_mer_purchase_order",
          function (t) {
            t.increments("id").primary();
            t.string("rmr", 35);
            t.integer("nr", 5);
            t.integer("projectid", 1);
            t.integer("req_typeid", 1);
            t.string("dopid", 5);
            t.string("req_via", 10);
            t.string("cust_date", 10);
            t.string("req_date", 10);
            t.integer("ccid", 10);
            t.string("cc_processed", 10);
            t.string("received_at", 12);
            t.string("received_name", 12);
            t.integer("requesterid", 5);
            t.integer("ownerid", 2);
            t.string("customerid", 5);
            t.integer("pnid", 7);
            t.string("request_status", 15);
            t.string("tt_number_cust", 30);
            t.string("tt_number", 35);
            t.string("site", 100);
            t.integer("qty", 10);
            t.integer("real_mttr", 3);
            t.integer("mttr", 4);
            t.integer("mttr_p2p", 3);
            t.integer("classid", 4);
            t.integer("pool_origid", 2);
            t.integer("pn_outid", 7);
            t.string("rma", 20);
            t.string("remark", 2);
            t.integer("cancel", 1);
            t.integer("oos", 1);
            t.integer("ffill", 1);
            t.integer("ria", 4);
            t.integer("close", 1);
            t.integer("sn_outid", 7);
            t.integer("deliveryid", 10);
            t.integer("status_goodid", 1);
            t.string("status_good_date", 12);
            t.string("request_pickup", 12);
            t.string("request_pickup_by", 25);
            t.integer("faultyid", 10);
            t.integer("pn_inid", 7);
            t.integer("sn_inid", 7);
            t.string("fr_number", 15);
            t.integer("pn_in2id", 7);
            t.integer("sn_in2id", 7);
            t.string("fr_number2", 15);
            t.integer("status_faultyid", 2);
            t.integer("sap_rok_unblock", 1);
            t.integer("doc_bound_faulty", 10);
            t.string("remark_faulty", 100);
            t.integer("sn_replenishid", 7);
            t.integer("doc_bound_replenish", 7);
            t.string("remark_trouble", 35);
            t.string("mttr_status", 15);
            t.integer("invoice", 1);
            t.string("update_date", 12);
            t.integer("update_ccid", 4);
            t.string("createdAt", 12);
            t.string("updatedAt", 12);
          }
        );
      }
    });
};

const tablePartnerRequest = async (data, model) => {
  model.schema.hasTable(data.label + "_mer_request").then(function (exists) {
    if (!exists) {
      return model.schema.createTable(
        data.label + "_mer_request",
        function (t) {
          t.increments("id").primary();
          t.string("rmr", 35);
          t.integer("nr", 5);
          t.integer("projectid", 1);
          t.integer("req_typeid", 1);
          t.string("dopid", 5);
          t.string("req_via", 10);
          t.string("cust_date", 10);
          t.string("req_date", 10);
          t.integer("ccid", 10);
          t.string("cc_processed", 10);
          t.string("received_at", 12);
          t.string("received_name", 12);
          t.integer("requesterid", 5);
          t.integer("ownerid", 2);
          t.string("customerid", 5);
          t.integer("pnid", 7);
          t.string("request_status", 15);
          t.string("tt_number_cust", 30);
          t.string("tt_number", 35);
          t.string("site", 100);
          t.integer("qty", 10);
          t.integer("real_mttr", 3);
          t.integer("mttr", 4);
          t.integer("mttr_p2p", 3);
          t.integer("classid", 4);
          t.integer("pool_origid", 2);
          t.integer("pn_outid", 7);
          t.string("rma", 20);
          t.string("remark", 2);
          t.integer("cancel", 1);
          t.integer("oos", 1);
          t.integer("ffill", 1);
          t.integer("ria", 4);
          t.integer("close", 1);
          t.integer("sn_outid", 7);
          t.integer("deliveryid", 10);
          t.integer("status_goodid", 1);
          t.string("status_good_date", 12);
          t.string("request_pickup", 12);
          t.string("request_pickup_by", 25);
          t.integer("faultyid", 10);
          t.integer("pn_inid", 7);
          t.integer("sn_inid", 7);
          t.string("fr_number", 15);
          t.integer("pn_in2id", 7);
          t.integer("sn_in2id", 7);
          t.string("fr_number2", 15);
          t.integer("status_faultyid", 2);
          t.integer("sap_rok_unblock", 1);
          t.integer("doc_bound_faulty", 10);
          t.string("remark_faulty", 100);
          t.integer("sn_replenishid", 7);
          t.integer("doc_bound_replenish", 7);
          t.string("remark_trouble", 35);
          t.string("mttr_status", 15);
          t.integer("invoice", 1);
          t.string("update_date", 12);
          t.integer("update_ccid", 4);
          t.string("createdAt", 12);
          t.string("updatedAt", 12);
        }
      );
    }
  });
};

const tablePartnerPN = async (data, model) => {
  model.schema.hasTable(data.label + "_mer_pn").then(function (exists) {
    if (!exists) {
      return model.schema.createTable(data.label + "_mer_pn", function (t) {
        t.increments("id").primary();
        t.string("pn", 100);
        t.integer("moduleid", 5);
        t.integer("idx_moduleid", 3);
        t.string("pn_basecode", 100);
        t.integer("vendorid", 5);
        t.integer("non_sap", 1);
        t.integer("non_puma", 1);
        t.integer("non_mb52", 4);
        t.integer("obsolete", 1);
        t.string("profl_sap", 50);
        t.string("material", 5);
        t.string("swap", 3);
        t.string("rr", 3);
        t.string("sps", 3);
        t.integer("neid", 3);
        t.integer("technologyid", 2);
        t.string("gram", 11);
        t.string("createdAt", 12);
        t.string("updatedAt", 12);
      });
    }
  });
};

const tablePartnerSN = async (data, model) => {
  model.schema.hasTable(data.label + "_mer_sn").then(function (exists) {
    if (!exists) {
      return model.schema.createTable(data.label + "_mer_sn", function (t) {
        t.increments("id").primary();
        t.string("sn", 30);
        t.integer("ownerid", 5);
        t.integer("customerid", 5);
        t.integer("pnid", 5);
        t.integer("poolid", 5);
        t.string("bin", 50);
        t.integer("sn_statusid", 5);
        t.integer("sn_markid", 5);
        t.integer("sn_accessid", 5);
        t.integer("service", 1);
        t.integer("rehomingid", 5);
        t.integer("last_owner", 5);
        t.integer("qty", 5);
        t.integer("stocktake", 1);
        t.string("last_stocktake", 20);
        t.integer("stocktaker", 5);
        t.integer("eventid", 3);
        t.text("note");
        t.text("remark");
        t.integer("boundid", 4);
        t.integer("doc_boundid", 10);
        t.integer("ams", 10);
        t.integer("in_house", 10);
        t.integer("out_house", 10);
        t.string("so", 15);
        t.string("dn", 15);
        t.string("createdAt", 12);
        t.string("updatedAt", 12);
      });
    }
  });
};

const tablePartnerDelivery = async (data, model) => {
  model.schema.hasTable(data.label + "_mer_delivery").then(function (exists) {
    if (!exists) {
      return model.schema.createTable(
        data.label + "_mer_delivery",
        function (t) {
          t.increments("id").primary();
          t.string("delivery_number", 20);
          t.string("doc_ext", 20);
          t.integer("doc_upload", 1);
          t.integer("pool_dopid", 4);
          t.integer("uploaderid", 4);
          t.string("create_mdd", 12);
          t.string("p2p_delivery", 12);
          t.string("actual_delivery", 12);
          t.string("mttr_delivery", 12);
          t.string("consignee", 35);
          t.string("upload_date", 12);
          t.integer("expeditionid", 4);
          t.integer("servicesid", 2);
          t.string("p2p_awb", 25);
          t.string("createdAt", 12);
          t.string("updatedAt", 12);
        }
      );
    }
  });
};

const tablePartnerUploadDoc = async (data, model) => {
  model.schema.hasTable(data.label + "_mer_upload_doc").then(function (exists) {
    if (!exists) {
      return model.schema.createTable(
        data.label + "_mer_upload_doc",
        function (t) {
          t.increments("id").primary();
          t.string("name", 25);
          t.string("ext", 5);
          t.integer("boundid", 4);
          t.integer("userid", 5);
          t.string("upload_date", 12);
          t.string("createdAt", 12);
          t.string("updatedAt", 12);
        }
      );
    }
  });
};

const tablePartnerDocBound = async (data, model) => {
  model.schema.hasTable(data.label + "_mer_doc_bound").then(function (exists) {
    if (!exists) {
      return model.schema.createTable(
        data.label + "_mer_doc_bound",
        function (t) {
          t.increments("id").primary();
          t.integer("boundid", 6);
          t.integer("userid", 5);
          t.string("no_doc", 50);
          t.integer("ownerid", 10);
          t.integer("customerid", 10);
          t.integer("servicesid", 2);
          t.integer("sn_statusid", 1);
          t.string("date_request", 12);
          t.string("date_send", 12);
          t.string("date_received", 12);
          t.integer("receivedid", 5);
          t.string("date_sent_input", 10);
          t.string("date_received_input", 10);
          t.integer("enter_fromid", 4);
          t.integer("enter_toid", 4);
          t.integer("expeditionid", 4);
          t.string("dn", 15);
          t.string("awb", 50);
          t.integer("qty_approx", 5);
          t.integer("appbyid", 5);
          t.text("mail_subject");
          t.string("date_nokia", 12);
          t.string("date_app", 12);
          t.string("date_skep", 12);
          t.string("date_pickup", 12);
          t.string("date_frc", 12);
          t.integer("status", 1);
          t.string("createdAt", 12);
          t.string("updatedAt", 12);
        }
      );
    }
  });
};

module.exports = {
  schmeaTablePartner,
};
