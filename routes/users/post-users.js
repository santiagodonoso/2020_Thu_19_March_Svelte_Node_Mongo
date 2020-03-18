const fs = require('fs');
const path = require("path")
const detect = require('detect-file-type');
const { v1: uuidv1 } = require('uuid');

module.exports = (req, res) => {
  
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if(err){console.log("error parsing form"); return}
    // console.log(`name: ${fields.name}`)
    // console.log(`last name: ${fields.lastName}`)
    // console.log(files)
    detect.fromFile(files.picture.path, (err, result) => {
      if (err) { return console.log(err) }
      // console.log(result) // { ext: 'jpg', mime: 'image/jpeg' }
      const allowedImageTypes = ["jpg", "jpeg", "png"]
      if( ! allowedImageTypes.includes(result.ext)){
        return res.send("error - file not allowed")
      }
      // Create a new name for the file
      console.log(uuidv1())
      const pictureName = uuidv1()+"."+result.ext
      var oldpath = files.picture.path
      var newpath = path.join(__dirname, "..", "..", "pictures", pictureName)
      fs.rename(oldpath, newpath, function (err) {
        if(err){return sendError(500, "cannot create picture")}
        try{
          const user = {"name":"A","lastName":"AA", "picture":pictureName}
          db.collection("users").insertOne(user, (err, dbResponse) => {
            if(err){return sendError(500, "cannot insert user")}        
            // console.log(dbResponse)
            return res.status(200).json(
              {"message":"user created","id":dbResponse.insertedId}
            )    
          })
        }catch(ex){
          return sendError(500, "cannot insert user")
        }
      })
    })
  })

  function sendError(status, message){
    return res.status(status).json(message)
  }

}

