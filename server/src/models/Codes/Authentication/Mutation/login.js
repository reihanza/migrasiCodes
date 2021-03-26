const bcrypt = require("bcrypt");
const validator = require("validator");

const { Account } = require("../");
const { signME, verify } = require("../../../../utils/token");

const login = async (_, args) => {
  let result;
  if (!validator.isEmpty(args.email) || !validator.isEmail(args.password)) {
    if (validator.isEmail(args.email)) {
      if (
        validator.isLength(args.password, {
          min: 3,
          max: 12,
        })
      ) {
        data = await Account.query()
          .where({
            email: args.email,
            status: 1,
          })
          .first();
        if (data) {
          if (bcrypt.compareSync(args.password, data.password)) {
            const token = await signME(data);
            const verifyToken = await verify(token.token);
            result = {
              token: token.token,
              refreshToken: token.refreshToken,
              email: data.email,
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
