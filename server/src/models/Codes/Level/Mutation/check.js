const { Level } = require("../");
const { PartnerLevel } = require("../");

const check = async (_, args, { user }) => {
  let result = false;
  const validate = await Level.query().where({ name: args.name }).first();
  if (typeof validate === "undefined") {
    result = false;
  } else {
    let levelPartner = await PartnerLevel.query()
      .where({
        partnerid: user.id,
        levelid: validate.id,
      })
      .first(0);
    if (levelPartner) {
      console.log("Data Level sudah ada!");
      result = true;
    } else {
      result = false;
    }
  }
  return result
};

module.exports = check;
