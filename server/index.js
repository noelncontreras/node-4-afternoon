require("dotenv").config();
const express = require("express");
const session = require("express-session");
const checkForSession = require("./middlewares/checkForSession");
const swagController = require("./controllers/swagController");
const authController = require("./controllers/authController");
const cartController = require("./controllers/cartController");
const searchController = require("./controllers/searchController");

let {SESSION_SECRET, SERVER_PORT} = process.env;

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(checkForSession);
app.use(express.static(`${__dirname} /../build`));

//ENDPOINTS
//SWAG
app.get("/api/swag", swagController.read);
//AUTH
app.post("/api/login", authController.login);
app.post("/api/register", authController.register);
app.post("/api/signout", authController.signOut);
app.get("/api/user", authController.getUser);
//CART
app.post("/api/cart/checkout", cartController.checkout);
app.post("/api/cart/:id", cartController.add);
app.delete("/api/cart/:id", cartController.delete);
//SEARCH
app.get("/api/search", searchController.search);

app.listen(SERVER_PORT, () => {
    console.log(`Listening on Port ${SERVER_PORT}`);
});