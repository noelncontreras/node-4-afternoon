const users = require("../models/users");
let id = 1

module.exports = {
    login: (req, res) => {
        const {session} = req;
        const {username, password} = req.body;
        
        let user = users.find(user => user.username === username && user.password === password);
        if(user) {
            session.user.username = user.username;
            console.log(session);
            res.status(200).json(session.user);
        } else {
            res.status(500).send("Unauthorized");
        }
    },
    register: (req, res) => {
        const {session} = req;
        const {username, password} = req.body;

        users.push({id, username, password});
        id++;
        session.user.username = username;
        console.log(users);
        res.status(200).json(session.user);
    },
    signout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getUser: (req, res) => {
        const {session} = req;
        res.status(200).send(session.user);
    }
}