const testQuery = require("./test");
const { getAccount } = require("./Codes/Account/Query");
const { getPartner, listPartnerOrder, listProductActive } = require("./Codes/Partner/Query");
const {
  getProduct,
  listProduct,
  getPackage,
  listPackage,
} = require("./Codes/Product/Query");
const { getDatabase, listDatabase } = require("./Codes/Database/Query");
const { listMenu, getMenu } = require("./Codes/Menu/Query");
const {
  listNavigation,
  getNavigation,
  listPermission,
  getPermission,
} = require("./Codes/Navigation/Query");
const { listCustomer, getCustomer } = require("./Codew/Customer/Query");
const { listEngineer, getEngineer } = require("./Codew/Engineer/Query");
const { listOwner, getOwner } = require("./Codew/Owner/Query");
const { listProject, getProject } = require("./Codew/Project/Query");
const {
  getBill,
  listOrder,
  getOrder,
  listStatusBill,
  getStatusBill,
  listStatusOrder,
  getStatusOrder,
  listLease,
  getLease,
} = require("./Codes/Order/Query");
const { listLevel, getLevel } = require("./Codes/Level/Query");

const Query = {
  testQuery,
  getAccount,
  getPartner,
  listPartnerOrder,
  getProduct,
  listProduct,
  getPackage,
  listPackage,
  getDatabase,
  listDatabase,
  listMenu,
  getMenu,
  listNavigation,
  getNavigation,
  listPermission,
  getPermission,
  listCustomer,
  getCustomer,
  listEngineer,
  getEngineer,
  listOwner,
  getOwner,
  listProject,
  getProject,
  listLevel,
  getLevel,
  getBill,
  listOrder,
  getOrder,
  listStatusBill,
  getStatusBill,
  listStatusOrder,
  getStatusOrder,
  listLease,
  getLease,
  listProductActive
};
module.exports = Query;
