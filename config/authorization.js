const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

const checkIsLogin = async (req, res, next) => {
    const header = req.headers.authorization.split(' ')[1];
    if(header === 'null') {
        return res.json({
            status: "forbidden",
            message: "JWT token not set"
        })
    } else {
        try {
            req.token = header;
            req.user= jwt.verify(req.token, "test");
            next();
        } catch (error) {
            return res.json({
                status: "forbidden",
                message: "JWT token not set"
            })
        }
    }
}

module.exports = { checkIsLogin };