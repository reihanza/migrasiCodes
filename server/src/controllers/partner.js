const { Partner } = require("../utils/model");
const { verifyForVerification } = require("../utils/token");

const confirmPartner = async (req, res, next) => {
  const code = req.params.activatedCode;
  let token, data;
  try {
    token = await verifyForVerification(code);
    data = await Partner.query().where({ id: token.id }).first();
    if (data) {
      const updatedAt = Date.now().toString();
      const active = 1;
      const update = { active, updatedAt };
      data = await Partner.query().updateAndFetchById(token.id, update);
      console.log(data);
      return res.send("Success!");
    } else {
      return res.send("Data not found!");
    }
  } catch (error) {
    console.log(`${error.message}`);
  }
};

module.exports = {
  confirmPartner,
};
