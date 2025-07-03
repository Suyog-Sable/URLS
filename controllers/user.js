const {v4: uuidv4} = require('uuid')
const User = require('../models/user')
const{setUser} = require('../services/auth')

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    try {
        await User.create({ name, email, password });

        return res.redirect("/login");
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate email
            return res.render("signup", {
                error: "Email already exists. Please log in instead.",
            });
        }

        console.error("Signup Error:", err);
        return res.status(500).render("signup", {
            error: "Something went wrong. Please try again.",
        });
    }
}


async function handleUserLogin(req,res){
    const {email, password}= req.body;
    const user = await User.findOne({email, password});
    if(!user) return res.render("login",{
        error: "Invalid Username or Password",
        
    });
    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    const token = setUser(user);
    res.cookie("uid",token);
    return res.redirect("/");
}

async function handleUserLogout(req, res) {
    try {
        res.clearCookie("uid");
        return res.redirect("/login");
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).send("Internal Server Error during logout.");
    }
}


module.exports={
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
};