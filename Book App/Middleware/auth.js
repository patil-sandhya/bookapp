const jwt = require("jsonwebtoken")
const {BlacklistModel} = require("../Model/blacklist.model")
const auth = async(req, res, next)=>{
    let token = req.headers.authorization?.split(" ")[1]
    if(token){
        let list = await BlacklistModel.findOne({token})
        if(list){
            res.send({"msg" :"Login again"})
        }else{
            jwt.verify(token, "book", (err, decoded)=>{
                if(err){
                    res.send({"err":err})
                }else{
                    next()
                }
            })
        }
    }else{
        res.send({"msg": "Rigister as New user"})
    }
}

module.exports= {
    auth
}