const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const { ApolloServer } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const bodyParser = require("body-parser");
const {
  googlePassportConfig,
  facebookPassportConfig,
} = require("./config/passport");
// import { facebookPassportConfig, googlePassportConfig } from './utils/passport'

const schema = importSchema(__dirname + "/models/schema.graphql").replace(
  "scalar Upload",
  ""
);
const resolvers = require("./models/resolvers");
const { verify } = require("./utils/token");
const app = express();
app.use(cors("*"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "authentication, authentications, xkey, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
app.use(passport.initialize());
googlePassportConfig();
facebookPassportConfig();
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "email" })
);
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "http://localhost:4000/",
  }),
  (req, res) => {
    //res.redirect('/');
    res.end("Logged in!");
  }
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    //res.redirect('/');
    res.end("Logged in!");
  }
);

const authUser = async (req, res, next) => {
  const token = req.headers.authentication;
  if (token) {
    try {
      const user_data = await verify(token);
      // console.log(user_data, token)
      req.user = user_data;
    } catch (error) {
      //   const refreshToken = req.headers.xkey;
      //   const newTokens = await singleRefreshToken("", {
      //     xkey: refreshToken,
      //   });
      //   if (newTokens) {
      //     console.log("token di refresh");
      //     res.header("authentication", newTokens);
      //     res.header("xkey", refreshToken);
      //     req.user = await verify(newTokens);
      //   } else {
      //     res.header("authentication", "");
      //     res.header("xkey", "");
      //     console.log("ga direfresh (token abis)");
      //   }
    }
  }
  next();
};
app.use(authUser);
// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     session: false,
//     failureRedirect: "http://localhost:4000/",
//   }),
//   googleAuth
// );
app.use("/partner", require("./routes/partner"));
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  // playground: { endpoint: "/graphql", settings: { "editor.theme": "light" } },
  context: async ({ req, res }) => {
    return {
      user: req.user,
      support: req.support,
      xtoken: req.headers.authentication,
      xsupport: req.headers.authentications,
      xkey: req.headers.xkey,
    };
  },
});
server.applyMiddleware({
  app,
});

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
