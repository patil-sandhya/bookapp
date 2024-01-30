const express = require("express")
const {BooksModel} = require("../Model/books.model")
const {auth} = require("../Middleware/auth")
const bookRouter = express.Router()

bookRouter.post("/books/add",auth, async(req,res)=>{
    const {title,author,genre,publishing_year} = req.body
    try {
        let newbook = new BooksModel({
            title,author,genre,publishing_year
        })

        await newbook.save()
        res.status(200).send({"msg":"Book added", "addedBook": newbook})
    } catch (error) {
        res.send({"err": error})
    }
})

bookRouter.get("/books",auth, async(req,res)=>{
    try {
        let list = await BooksModel.find()
        res.status(200).send({"book": list})
    } catch (error) {
        res.send({"err": error})
    }
})


bookRouter.patch("/books/update/:id",auth, async(req,res)=>{
    let {id} = req.params
    try {
        await BooksModel.findByIdAndUpdate({_id:id}, req.body)
        res.status(200).send({"msg":"Book has been updated"})
    } catch (error) {
        res.send({"err": error})
        
    }
})

bookRouter.delete("/books/delete/:id",auth, async(req,res)=>{
    let {id} = req.params
    try {
        await BooksModel.findByIdAndDelete({_id:id}, req.body)
        res.status(200).send({"msg":"Book has been deleted"})
    } catch (error) {
        res.send({"err": error})
        
    }
})

module.exports ={
    bookRouter
}