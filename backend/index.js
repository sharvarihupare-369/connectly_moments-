const express = require('express')
const { connection } = require('./config')
require('dotenv').config()
const userRoutes = require("./routes/userRoutes")

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome to home route")
})

app.use('/api/users', userRoutes)


app.listen(PORT,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error connecting to MongoDB:", error)
    }
    console.log(`Server is running on port ${PORT}`)
})