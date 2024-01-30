const express = require("express")
const {connection} = require("./db")
const { rateLimit } = require('express-rate-limit')
const {userRouter} = require("./Route/user.route")
const  {bookRouter} = require("./Route/book.route")

const app = express()

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 15 minutes
	limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, 
})

app.use(limiter)
app.use(express.json())
app.use("/user", userRouter)
app.use("/book", bookRouter)



app.listen(8080, async()=>{
    try {
        await connection;
    console.log("server is running on 8080")
    console.log("Connected to DB")
    
    } catch (error) {
        console.log(error)
    }
})