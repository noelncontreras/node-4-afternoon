const users = require("../models/users");
let id = 1;

module.exports = {
    login: (req, res) => {
        const {session} = req;
        const {username, password} = req.body;
        
        const user = users.find(user => user.username === username && user.password === password);
        if(user) {
            session.user.username = user.username;
            // console.log(session); <-- did this to see if user was logged in
            res.status(200).send(session.user);
        } else {
            res.status(500).json("Unauthorized");
        }
    },
    register: (req, res) => {
        const {session} = req;
        const {username, password} = req.body;

        users.push({id, username, password});
        id++;
        session.user.username = username;
        // console.log(users); <-- did this to see if new user was registered and id was incrementing
        res.status(200).json(session.user);
    },
    signOut: (req, res) => {
        // const {session} = req;
        req.session.destroy();
        res.status(200).json(req.session);
    },
    getUser: (req, res) => {
        const {session} = req;
        res.status(200).json(session.user);
    }
};