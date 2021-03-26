const { Rolenav_codew, Rolenav_codei, Rolenav_codev, Level, Navigation } = require("../../");

const removeRoleNavigation = async (_, args, { user }) => {
  var result = false;
  var deleteData = [];
  var level = await Level.query().where({ id: args.levelid }).first();
  var roleLevel = [];
  switch (args.productid) {
    case 1:
      roleLevel = await Rolenav_codew.query().where({
        levelid: level.id,
        partnerid: user.id,
      });
      break;
    case 2:
      roleLevel = await Rolenav_codei.query().where({
        levelid: level.id,
        partnerid: user.id,
      });
      break;
    case 3:
      roleLevel = await Rolenav_codev.query().where({
        levelid: level.id,
        partnerid: user.id,
      });
      break;
    default:
      break;
  }
  var navId = [];
  for (let a = 0; a < roleLevel.length; a++) {
    navId.push(roleLevel[a].navid);
  }
  if (navId.includes(args.navid)) {
    var navigation = await Navigation.query().where({ id: args.navid }).first();
    if (parseInt(navigation.parentid) == 0) {
      deleteData.push(navigation.id);
      let dataChild = await Navigation.query()
        .where({ parentid: navigation.id })
        .whereIn("id", navId);
      if (dataChild.length > 0) {
        for (let q = 0; q < dataChild.length; q++) {
          deleteData.push(dataChild[q].id);
          let dataGrandChild = await Navigation.query()
            .where({ parentid: dataChild[q].id })
            .whereIn("id", navId);
          if (dataGrandChild.length > 0) {
            for (let qq = 0; qq < dataGrandChild.length; qq++) {
              deleteData.push(dataGrandChild[qq].id);
            }
          }
        }
      }
    }
    result = true;
  } else {
    console.log("data sudah ada!");
    result = false;
  }
  if (deleteData.length > 0) {
    for (let dex = 0; dex < deleteData.length; dex++) {
      switch (args.productid) {
        case 1:
          roleLevel = await Rolenav_codew.query().delete().where({
            levelid: level.id,
            partnerid: user.id,
            navid: deleteData[dex],
          });
          break;
        case 2:
          roleLevel = await Rolenav_codei.query().delete().where({
            levelid: level.id,
            partnerid: user.id,
            navid: deleteData[dex],
          });
          break;
        case 3:
          roleLevel = await Rolenav_codev.query().delete().where({
            levelid: level.id,
            partnerid: user.id,
            navid: deleteData[dex],
          });
          break;
        default:
          break;
      }
    }
    result = true;
  }
  return result;
};
module.exports = removeRoleNavigation;
