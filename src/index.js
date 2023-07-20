const express = require('express')
const path = require('path')
const eje = require('ejs')
const multer = require('multer')
const uuid = require('uuid')

const storage = multer.diskStorage({
  destination:path.join(__dirname,'public/uploads'),
  filename:(req,file,cb)=>{
    // cb(null, file.originalname)
    cb(null,uuid.v4() + path.extname(file.originalname).toLocaleLowerCase())
  }
})

// inicializacion
const app = express()
// seting 
app.set('port',3000)
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))
//middelware
app.use(multer({
  storage:storage,
  dest:path.join(__dirname,'public/uploads'),
  limits:{fileSize:20000000},
  fileFilter:(req,file,cb) =>{
    const filetypes=/jpeg|jpg|png|gif/
    const minetype =filetypes.test(file.mimetype)
    const extname= filetypes.test(file.originalname)
    if (minetype && extname) {
      return cb(null,true)
    }
    cb('error:El archivo debe ser una Imagen valida')
  }
}).single('image'))

//routes
app.get('/',(req,res)=>{
  res.render('index')   
})
app.post('/upload', (req,res)=>{
  console.log(req.file)
  res.send('Uploade !!!!')
})
//start Server 

app.listen(app.get('port'), () =>{
    console.log(`Servidor Corriendo en http://localhost:${app.get('port')}`)
})