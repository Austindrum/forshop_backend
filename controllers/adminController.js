const db = require("../models");
const User = db.User;
const Category = db.Category;
const SubCategory = db.SubCategory;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminController = {
    signin: async (req, res)=>{
        const data = {
            email: req.body.email,
            password: req.body.password
        }
        const user = await User.findOne({
            where: { email: data.email }
        })
        if(!user){
            return res.json({
                status: {
                    code: 400,
                },
                message: "帳號輸入錯誤"
            })
        }
        if(!bcrypt.compareSync(data.password, user.password)){
            return res.json({
                status: {
                    code: 400
                },
                message: "密碼輸入錯誤"
            })
        }
        const payload = user.dataValues;
        const token = jwt.sign(payload, "test", { expiresIn: '1h' });
        return res.json({
            status: {
                code: 200
            },
            message: "登入成功",
            token,
            user
        })
    },
    getCurrentUser: async (req, res) =>{
        try {
            if(req.user){
                return res.json({
                    status: "success",
                    message: "登入成功"
                })
            }
            return res.json({
                status: "forbidden",
                message: "No user data",
            })
        } catch (err) {
            console.log(err);
        }
    },
}
module.exports = adminController;