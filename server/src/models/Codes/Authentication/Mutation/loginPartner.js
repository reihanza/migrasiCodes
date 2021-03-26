const bcrypt = require("bcrypt");
const validator = require("validator");

const { Partner, Order } = require("../");
const { signPartner, verify } = require("../../../../utils/token");

const login = async (_, args) => {
  let result;
  if (!validator.isEmpty(args.email) || !validator.isEmail(args.password)) {
    if (validator.isEmail(args.email)) {
      if (validator.isLength(args.password, { min: 3, max: 12 })) {
        data = await Partner.query()
          .where({
            email: args.email,
            active: 1,
          })
          .first();
        if (data) {
          if (bcrypt.compareSync(args.password, data.password)) {
            const partner = await Order.query()
              .select("*")
              .where("partnerid", data.id);
            var proid = [];
            for (let index = 0; index < partner.length; index++) {
              proid.push(partner[index].productid);
            }
            data.proid = proid;
            const token = await signPartner(data);
            const verifyToken = await verify(token.token);
            // console.log(verifyToken);
            result = {
              token: token.token,
              refreshToken: token.refreshToken,
              email: data.email,
              partnerid: data.ids,
              iat: verifyToken.iat,
              exp: verifyToken.exp,
              status: 1,
            };
          }
        }
      }
    }
  }
  return result;
};
module.exports = login;
