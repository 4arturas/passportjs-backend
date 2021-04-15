const express           = require("express");
const cors              = require("cors");
const passport          = require("passport");
const passportLocal     = require("passport-local").Strategy;
const cookieParser      = require("cookie-parser");
const session           = require("express-session");
const bodyParser        = require("body-parser");
const app               = express();
const DB                = require("./db");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);



// Routes
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if ( err )
            throw err;
        if ( !user )
            res.send("No User Exists");
        else
        {
            req.logIn(user, (err) => {
                if ( err )
                    throw err;
                res.send("Successfully Authenticated");
                console.log(req.user);
            });
        }
    })(req, res, next);
});
app.post("/register", (req, res) => {
    const user = DB.getUserByName( req.body.username );
    if ( user !== null )
    {
        res.send("User Already Exists");
        return;
    }
    DB.addUser( req.body.use, req.body.password );
    res.send( "User Created" );
});
app.get("/user", (req, res) => {
    res.send( req.user );
});
//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(4000, () => {
    console.log("Server Has Started");
});