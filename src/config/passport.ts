import { Users } from "@resources/user/user.model";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

const jwtTokenPublicSecret =
  process.env.JWT_PUBLIC_KEY ||
  "-----BEGIN PUBLIC KEY-----\nMIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFvbxh4tg6qVVpCEvMwliqTOh584\n+Yk7OJOU7qUwwkghhoqOTR1vo4OAVEIwSL5TFXG5lC3lbvwkRLI6ypU7XfVDINwM\nFg8of0yLwuA95tPQ08jjWaITU1NgDGopIj4Cw6WsDdj6zvK/DnRSOricAIm1czXE\nGEviJZZTr9KQakn3AgMBAAE=\n-----END PUBLIC KEY-----";

export default (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => {
        Users.findOne({ email }, (err, user) => {
          if (err) return done(err);
          if (!user) return done(null, false);
          if (!user.comparePassword(password)) return done(null, false);
          return done(null, user);
        });
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtTokenPublicSecret,
        algorithms: ["RS512"],
      },
      (jwtPayload, cb) =>
        Users.findById(jwtPayload.userId)
          .then((user) => cb(null, user))
          .catch((err) => cb(err))
    )
  );
};
