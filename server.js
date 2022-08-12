require('dotenv').config()
const express = require('express')
const Formidable = require('formidable');
const cloudinary = require("cloudinary");

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });


const app = express()
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/image/post',(req,res)=>{
    const form =  Formidable({multiples:true})
    form.parse(req,(err,fields,files)=>{

        cloudinary.uploader.upload(files.image.filepath,result=>{
            result ? res.redirect('/') : null
        })
    })
})



app.listen(5000,()=>{
    console.log('server running ')
})
