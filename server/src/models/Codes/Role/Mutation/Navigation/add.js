const {
  Rolenav_codew,
  Rolenav_codei,
  Rolenav_codev,
  Level,
} = require("../../");
const addRoleNavigation = async (_, args, { user }) => {
  var result = false;
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
    console.log(args.navid, navId);
    console.log("data sudah ada!");
    result = false;
    // } else {
    //   var navigation = await Navigation.query().where({ id: args.navid }).first();
    //   let insertNav = {
    //     levelid: level.id,
    //     navid: navigation.id,
    //     permid: "1",
    //     partnerid: user.id,
    //     createdAt: Date.now().toString(),
    //     updatedAt: Date.now().toString(),
    //   };
    //   switch (args.productid) {
    //     case 1:
    //       await Rolenav_codew.query().insert(insertNav);
    //       break;
    //     case 2:
    //       await Rolenav_codei.query().insert(insertNav);
    //       break;
    //     case 3:
    //       await Rolenav_codev.query().insert(insertNav);
    //       break;
    //     default:
    //       break;
    //   }
    //   if (parseInt(navigation.parentid) == 0) {
    //     let dataChild = await Navigation.query()
    //       .where({ parentid: navigation.id })
    //       .whereNotIn("id", navId);
    //     if (dataChild.length > 0) {
    //       for (let q = 0; q < dataChild.length; q++) {
    //         let insertChild = {
    //           levelid: level.id,
    //           navid: dataChild[q].id,
    //           permid: "1",
    //           partnerid: user.id,
    //           createdAt: Date.now().toString(),
    //           updatedAt: Date.now().toString(),
    //         };
    //         switch (args.productid) {
    //           case 1:
    //             await Rolenav_codew.query().insert(insertChild);
    //             break;
    //           case 2:
    //             await Rolenav_codei.query().insert(insertChild);
    //             break;
    //           case 3:
    //             await Rolenav_codev.query().insert(insertChild);
    //             break;
    //           default:
    //             break;
    //         }
    //         let dataGrandChild = await Navigation.query()
    //           .where({ parentid: dataChild[q].id })
    //           .whereNotIn("id", navId);
    //         if (dataGrandChild.length > 0) {
    //           for (let qq = 0; qq < dataGrandChild.length; qq++) {
    //             let insertGrandChild = {
    //               levelid: level.id,
    //               navid: dataGrandChild[qq].id,
    //               permid: "1",
    //               partnerid: user.id,
    //               createdAt: Date.now().toString(),
    //               updatedAt: Date.now().toString(),
    //             };
    //             switch (args.productid) {
    //               case 1:
    //                 await Rolenav_codew.query().insert(insertGrandChild);
    //                 break;
    //               case 2:
    //                 await Rolenav_codei.query().insert(insertGrandChild);
    //                 break;
    //               case 3:
    //                 await Rolenav_codev.query().insert(insertGrandChild);
    //                 break;
    //               default:
    //                 break;
    //             }
    //           }
    //         }
    //       }
    //     }
    //     result = true;
    //   } else {
    //     let parent = await Navigation.query()
    //       .where({ id: navigation.parentid })
    //       .whereNotIn("id", navId)
    //       .first();
    //     let insertParent = {
    //       levelid: level.id,
    //       navid: parent.id,
    //       permid: "1",
    //       partnerid: user.id,
    //       createdAt: Date.now().toString(),
    //       updatedAt: Date.now().toString(),
    //     };
    //     switch (args.productid) {
    //       case 1:
    //         await Rolenav_codew.query().insert(insertParent);
    //         break;
    //       case 2:
    //         await Rolenav_codei.query().insert(insertParent);
    //         break;
    //       case 3:
    //         await Rolenav_codev.query().insert(insertParent);
    //         break;
    //       default:
    //         break;
    //     }
    //     if (parseInt(parent.parentid) == 0) {
    //       let grandParent = await Navigation.query()
    //         .where({ id: navigation.parentid })
    //         .first();
    //       let insertGrandParent = {
    //         levelid: level.id,
    //         navid: grandParent.id,
    //         permid: "1",
    //         partnerid: user.id,
    //         createdAt: Date.now().toString(),
    //         updatedAt: Date.now().toString(),
    //       };
    //       switch (args.productid) {
    //         case 1:
    //           await Rolenav_codew.query().insert(insertGrandParent);
    //           break;
    //         case 2:
    //           await Rolenav_codei.query().insert(insertGrandParent);
    //           break;
    //         case 3:
    //           await Rolenav_codev.query().insert(insertGrandParent);
    //           break;
    //         default:
    //           break;
    //       }
    //     } else {
    //       let dataChild = await Navigation.query()
    //         .where({ parentid: navigation.id })
    //         .whereNotIn("id", navId);
    //       if (dataChild.length == 0) {
    //         result = true;
    //       } else {
    //         console.log("aneh");
    //         for (let q = 0; q < dataChild.length; q++) {
    //           let insertChild = {
    //             levelid: level.id,
    //             navid: dataChild[q].id,
    //             permid: "1",
    //             partnerid: user.id,
    //             createdAt: Date.now().toString(),
    //             updatedAt: Date.now().toString(),
    //           };
    //           switch (args.productid) {
    //             case 1:
    //               await Rolenav_codew.query().insert(insertChild);
    //               break;
    //             case 2:
    //               await Rolenav_codei.query().insert(insertChild);
    //               break;
    //             case 3:
    //               await Rolenav_codev.query().insert(insertChild);
    //               break;
    //             default:
    //               break;
    //           }
    //         }
    //       }
    //       result = true;
    //     }
    //   }
  }
  return result;
};
module.exports = addRoleNavigation;
