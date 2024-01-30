const express = require("express")
const bcrypt = require("bcrypt")
const {UserModel} = require("../Model/user.model")
const  jwt = require("jsonwebtoken")
const  {BlacklistModel} = require("../Model/blacklist.model")
const userRouter = express.Router()


userRouter.post("/users/register", async(req,res)=>{
    const {name,email,pass,city,age} = req.body
    let checkUser = await UserModel.findOne({email})
    if(checkUser){
        res.send({"msg":"User is already register"})
    }else{

        let checkRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[#@$%^&*!])(?=.{8})/
        //console.log(checkRegex.test(pass))
        if(checkRegex.test(pass)){
        bcrypt.hash(pass, 5, async(err,hash)=>{
            try {
                if(err){
                    res.send(err)
                }{
                    const newuser = new UserModel({
                        name,email,city,age,
                        pass:hash
                    })
                    await newuser.save()
                    res.status(200).send({"message" : {"msg":"The new user has been registered", "registeredUser":newuser}})
                } 
            } catch (error) {
                res.status(400).send({"error": error})
            }
           
        })
    }else{
        res.send({"msg":"Enter valid pass"})
    }
    }
})


userRouter.post("/users/login", async(req,res)=>{
    const {email, pass}= req.body
    try {
        let user = await UserModel.findOne({email})

        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=>{
                if(err){
                    res.status(400).send({"err": err})
                }else{
                    const token = jwt.sign({name: "username"}, "book", {expiresIn:500})
                    res.status(200).send({"msg":"Login successful!", "token":token} )
                }
            })
        }else{
            res.send({"msg": "User Not found"})
        }
    } catch (error) {
        res.send(error)
    }
})


userRouter.get("/users/logout", async(req,res)=>{
    let token = req.headers.authorization?.split(" ")[1]
    try {
        const newlist = new BlacklistModel({
            token
        })
        await newlist.save()
        res.status(200).send({"msg":"User has been logged out"})
    } catch (error) {
        res.send(err)
    }
})

module.exports = {
    userRouter
}