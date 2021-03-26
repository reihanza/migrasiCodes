const bcrypt = require("bcrypt");
const { Partner } = require("../../utils/model");
const { v4: uuidv44 } = require("uuid");
const { generateRandomString } = require("../../utils/character");
const { sendMailVerivy } = require("../../utils/email");
const {
  signForVerification,
  verifyForVerification,
} = require("../../utils/token");

const googleAuth = async (data) => {
  //   console.log(data);
  const partner = await Partner.query()
    .where({ email: data.emails[0].value })
    .first();
  if (partner) {
    console.log("data ada silahkan login");
  } else {
    var password = await generateRandomString();
    var passwordHash = bcrypt.hashSync(password, 12);
    const insert = {
      ids: uuidv44(Date.now()),
      name: data.displayName,
      email: data.emails[0].value,
      password: passwordHash,
      phone: 2,
      active: 0,
      createdAt: Date.now().toString().substring(0, Date.now().toString()),
      updatedAt: Date.now().toString().substring(0, Date.now().toString()),
    };
    var newPartner = await Partner.query().insertAndFetch(insert);
    if (newPartner) {
      const token = await signForVerification(newPartner.id);
      const verifyToken = await verifyForVerification(token);
      await sendMailVerivy(newPartner.email, token, password, "partner");
      console.log("partner tersimpan");
    }
  }
};
const facebookAuth = async (data) => {
  const partner = await Partner.query()
    .where({ email: data.emails[0].value })
    .first();
  if (partner) {
    console.log("data ada silahkan login");
  } else {
    var password = await generateRandomString();
    var passwordHash = bcrypt.hashSync(password, 12);
    const insert = {
      ids: uuidv44(Date.now()),
      name: data.displayName,
      email: data.emails[0].value,
      password: passwordHash,
      phone: 3,
      active: 0,
      createdAt: Date.now().toString().substring(0, Date.now().toString()),
      updatedAt: Date.now().toString().substring(0, Date.now().toString()),
    };
    var newPartner = await Partner.query().insertAndFetch(insert);
    if (newPartner) {
      const token = await signForVerification(newPartner.id);
      const verifyToken = await verifyForVerification(token);
      await sendMailVerivy(newPartner.email, token, password, "partner");
      console.log("partner tersimpan");
    }
  }
};
module.exports = {
  googleAuth,
  facebookAuth,
};
