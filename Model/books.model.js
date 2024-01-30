const mongoose = require("mongoose")

const booksSchema = mongoose.Schema({
    title:String,
    genre:String,
    author:String,
    publishing_year :String,
})

const BooksModel = mongoose.model("book", booksSchema)

module.exports ={
    BooksModel
}