const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;
const SECRET_EMAIL = process.env.SECRET_EMAIL;

const verify = async (token) => {
  return await jwt.verify(token, SECRET);
};

const signME = async (data) => {
  const token = await jwt.sign(
    {
      id: data.id,
      email: data.email,
    },
    SECRET,
    {
      expiresIn: 60 * 60,
    }
  );
  const refreshToken = await jwt.sign(
    {
      id: data.id,
    },
    SECRET,
    {
      expiresIn: 5 * 60,
    }
  );
  return {
    token,
    refreshToken,
  };
};

const signPartner = async (data) => {
  const token = await jwt.sign(
    {
      id: data.id,
      ids: data.ids,
      proid: data.proid,
      email: data.email,
    },
    SECRET,
    { expiresIn: 60 * 60 }
  );
  const refreshToken = await jwt.sign(
    {
      id: data.id,
    },
    SECRET,
    { expiresIn: 5 * 60 }
  );
  return { token, refreshToken };
};
const signForVerification = async (id) => {
  const token = await jwt.sign(
    {
      id: id,
    },
    SECRET_EMAIL,
    {
      expiresIn: 1440 * 60,
    }
  );
  return token;
};
const verifyForVerification = async (token) => {
  return await jwt.verify(token, SECRET_EMAIL);
};

module.exports = {
  verify,
  signME,
  signPartner,
  signForVerification,
  verifyForVerification,
};
