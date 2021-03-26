const getBill = require("./Bill/get");

const getOrder = require("./get");
const listOrder = require("./list");
const listLease = require("./Lease/list");
const getLease = require("./Lease/get");

const listStatusBill = require("./Status/bill/list");
const getStatusBill = require("./Status/bill/get");

const listStatusOrder = require("./Status/order/list");
const getStatusOrder = require("./Status/order/get");

module.exports = {
  getOrder,
  getBill,
  listOrder,
  listLease,
  getLease,
  listStatusBill,
  getStatusBill,
  listStatusOrder,
  getStatusOrder,
};
