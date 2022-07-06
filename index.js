const express = require("express");
const formidable = require("formidable");
const path = require('path')
const multer = require('multer')
const cors = require('cors')
const morgan = require('morgan')
const fs = require( 'fs')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(morgan('dev'))
app.get('/',(req,res)=>{
    res.send('hello world')
})

  
app.post('/formidable', async (req,res)=>{
   const form = formidable({multiples:true})
   form.parse(req,(err,field,files)=>{

    for(let i in files.image){
        console.log(files.image)
        const oldpath = files.image[i].filepath
        const newPath = `${__dirname}/upload/${ Date.now() + files.image[i].originalFilename}`
          const rawdata = fs.readFileSync(oldpath)
            fs.writeFileSync(newPath,rawdata)
    }
   })
})

app.listen(5000,()=>{
    console.log('server running successfull')
})