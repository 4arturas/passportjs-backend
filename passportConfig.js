const localStrategy = require("passport-local").Strategy;
const DB = require("./db")

module.exports = function (passport)
{
    passport.use(
        new localStrategy((username, password, done) => {
            const user = DB.getUserByName( username );
            if ( user === null )
                return done( null, false );
            if ( password === user.password )
                return done( null, user );
            return done( null, false );
        })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
        const user = DB.getUserById( id );
        const userInfo = { username: user.username };
        cb( null, userInfo );
    });
};