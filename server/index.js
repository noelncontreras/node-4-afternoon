require("dotenv").config();
const express = require("express");
const session = require("express-session");
const checkForSession = require("../server/middlewares/checkForSession");
const swagController = require("./controllers/swagController");
const authController = require("./controllers/authController");
const app = express();

let {SESSION_SECRET, SERVER_PORT} = process.env;

//MIDDLEWARE
app.use(express.json());
app.use(session ({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession);

//ENDPOINTS
//SWAG
app.get("/api/swag", swagController.read);
//AUTH
app.post("/api/login", authController.login);
app.post("/api/register", authController.register);
app.post("/api/signout", authController.signout);
app.get("/api/user", authController.getUser);

app.listen(SERVER_PORT, () => {
    console.log(`Listening on Port ${SERVER_PORT}`);
})
