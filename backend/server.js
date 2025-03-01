const express = require("express") 
const app = express()
const dotenv =require("dotenv").config() //to make the app listen on the port we mentioned : 5000
const connectDb=require("./config/connectionDb")

const PORT = process.env.PORT || 3000 //if it doesnt listen on port 5000 written in .env file then listen on 3000 port

//since it doesnt listen then install npm i dotenv

connectDb()
app.use(express.json())

app.use("/recipe", require("./routes/recipe")); //for routes related to recipe

app.listen(PORT,(err) => {
    console.log(`app is listening on port ${PORT}`); //checking if port is running
})