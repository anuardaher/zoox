const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy
const { ExtractJwt } = require("passport-jwt")

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    async function (jwtPayload, done) {
      try {
        return done(null, user)
      } catch (err) {
        return done(new Error(), false)
      }
    }
  )
)

module.exports = null
