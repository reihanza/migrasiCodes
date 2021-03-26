const {
  Level,
  PartnerLevel,
  Rolenav_codew,
  Rolenav_codei,
  Rolenav_codev,
} = require("../");

const check = async (_, args, { user }) => {
  var result;
  const validate = await Level.query().where({ name: args.name }).first();
  if (typeof validate === "undefined") {
    const insert = {
      ...args,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };
    const newLevel = await Level.query().insertAndFetch(insert);
    if (newLevel) {
      const insertLevelPartner = await PartnerLevel.query().insert({
        partnerid: user.id,
        levelid: newLevel.id,
      });
      if (insertLevelPartner) {
        let insertMenu = {
          levelid: newLevel.id,
          partnerid: user.id,
          menuid: "1",
          updatedAt: Date.now().toString(),
        };
        let insertNav = {
          levelid: newLevel.id,
          navid: 4,
          partnerid: user.id,
          permid: 1,
          updatedAt: Date.now().toString(),
        };
        var insertAction = 0;
        for (let index = 0; index < user.proid.length; index++) {
          switch (user.proid[index]) {
            case 1:
              var actionNav = await Rolenav_codew.query().insert(insertNav);
              if (actionNav) {
                insertAction++;
              }
              break;
            case 2:
              var actionNav = await Rolenav_codei.query().insert(insertNav);
              if (actionNav) {
                insertAction++;
              }
              break;
            case 3:
              var actionNav = await Rolenav_codev.query().insert(insertNav);
              if (actionNav) {
                insertAction++;
              }
              break;
            default:
              break;
          }
        }
        if (insertAction == user.proid.length) {
          console.log("Create level succes to save!");
          return newLevel;
        }
      }
    } else {
      console.log("Data gagal di simpan");
    }
  } else {
    console.log("ada levelnya");
  }
  return result;
};

module.exports = check;
