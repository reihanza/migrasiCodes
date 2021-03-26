const { Account } = require("../");

const get = async (_, args, { user }) => {
  let result;
  if (user) {
    const data = await Account.query()
      .where({ id: user.id })
      .withGraphFetched("partner")
      .first();
    result = data;
  }
  return result;
};
module.exports = get;
