const express = require("express")
const app = express()
const mongoClient = require("mongodb").MongoClient
global.formidable = require("formidable")
// ##################################################
const path = require("path")
const mongoUrl = "mongodb://localhost:27017/"
global.db = ''


// ##################################################
mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, res) => {
  if(err){console.log("database error"); return}
  db = res.db("company_three")
})
// ##################################################
// ROUTES
// const rPostUsers = require(__dirname+"/routes/users/post-users.js")
const rPostUsers = require(path.join(__dirname, "routes","users","post-users.js"))

// ##################################################
// USERS
app.post("/users", rPostUsers)
// ##################################################

// ##################################################


// ##################################################
app.listen( 80, err => {
  if(err){console.log("Server cannot listen"); return}

})