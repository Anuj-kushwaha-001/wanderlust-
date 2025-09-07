const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,    
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/register", (req, res) => {
    const {name = "anonymous"} = req.query;
    req.session.name = name;
    req.flash("success", "Successfully registered");
    res.redirect("/hello");
});
 
app.get("/hello", (req, res) => {
    res.locals.messages = req.flash("success");
    res.render("page.ejs", { name: req.session.name,  });
});
// app.use(session({ secret: "mysupersecretstring", resave: false, saveUninitialized: true }));

// app.get("/reqcount", (req, res) => {
//     if (req.session.count) {
//         req.session.count += 1;
//     } else {
//         req.session.count = 1;
//     }
//         res.send(`you send a request ${req.session.count} times`);
//         return;
//     }
// );  
// app.get("/test", (req, res) => {
//     res.send("test successful !");
// });




// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req, res) => {
//     res.cookie("made-in","India",{signed:true});
//     res.send("sent you signed cookie");
// } );

// app.get("/verify", (req, res) => {
//     console.log(req.signedCookies);
//     res.send("verified");
// });

// app.get("/greet", (req, res) => {
//     let {name = "Guest"} = req.cookies;
//     res.send(`Hello, ${name}`);
// });

// app.get("/getcookie", (req, res) => {
//     res.cookie("greet","hello");
//     res.send("sent you some coockie");
// });

// app.get("/", (req, res) => {  
//     console.dir(req.cookies);
//     res.send("Hi, i am root"); 
// });

// app.use("/users", users);
// app.use("/posts", posts);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});