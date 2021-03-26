const { login, loginPartner } = require("./Codes/Authentication/Mutation");
const {
  createMenu,
  updateMenu,
  deleteMenu,
  activeMenu,
} = require("./Codes/Menu/Mutation");
const {
  createNavigation,
  updateNavigation,
  deleteNavigation,
  addSubNavigation,
  createPermission,
  updatePermission,
  deletePermission,
  activePermission,
} = require("./Codes/Navigation/Mutation");
const {
  checkLevel,
  createLevel,
  updateLevel,
  removeLevel,
} = require("./Codes/Level/Mutation");
const {
  createOrder,
  updateOrder,
  closeOrder,
} = require("./Codes/Order/Mutation");
const {
  addRoleNavigation,
  removeRoleNavigation,
} = require("./Codes/Role/Mutation");

const Mutation = {
  login,
  loginPartner,
  createMenu,
  updateMenu,
  deleteMenu,
  activeMenu,
  createNavigation,
  updateNavigation,
  deleteNavigation,
  addSubNavigation,
  createPermission,
  updatePermission,
  deletePermission,
  activePermission,
  checkLevel,
  createLevel,
  createOrder,
  updateOrder,
  closeOrder,
  addRoleNavigation,
  removeRoleNavigation,
};
module.exports = Mutation;
