const createNavigation = require("./insert");
const updateNavigation = require("./update");
const deleteNavigation = require("./delete");
const addSubNavigation = require("./add");

const createPermission = require("./permission/create")
const updatePermission = require("./permission/update")
const activePermission = require("./permission/active")
const deletePermission = require("./permission/delete")

module.exports = {
    createNavigation,
    updateNavigation,
    deleteNavigation,
    addSubNavigation,

    createPermission,
    updatePermission,
    activePermission,
    deletePermission,
}