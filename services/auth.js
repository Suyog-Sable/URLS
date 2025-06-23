// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "suyog$1234#"

// function setUser(id, user){
//     sessionIdToUserMap.set(id,user);
// }
function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
}

// function getUser(id){
function getUser(token) {
    if (!token) return null;
    try{
        return jwt.verify(token,secret);
    }catch(error){
        return null;
    }
    // return sessionIdToUserMap.get(id);
    return jwt.verify(token, secret);
}

module.exports = {
    setUser,
    getUser,
}