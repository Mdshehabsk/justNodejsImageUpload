const express = require('express')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const imageModel = require('./schema/image')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
app.use(express.json())


app.set('view engine', 'ejs')
app.use(express.static(`${__dirname}/public`))
app.get('/', (req,res,next)=>{
    res.render('index')
})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public')
    },
    filename: function (req, file, cb) {
      const fileExt = path.extname(file.originalname)
      const filename = file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-')+ '-' + Date.now()
      cb(null, filename + fileExt)
    }
  })
app.get('/image', async(req,res,next)=>{
    const image =await imageModel.find()
    res.render('image', {imageLink:image})
})
const upload = multer({ storage: storage })
app.post('/imageupload',upload.single('avatar'),async (req,res,next)=>{
    try{
        const file = req.file.filename
        await new imageModel({
            image:file
        }).save()
        res.redirect('/image')
    }catch(err){
        res.send('no image choosen')
    }
})

app.post('/imageDelete/:id', async(req,res,next)=>{
  const imageDelete = await imageModel.findByIdAndDelete({_id:req.params.id})
   fs.unlinkSync(`./public/${imageDelete.image}`)
   res.redirect('/image')
})

const DB_PORT = process.env.DB_PORT
mongoose.connect(DB_PORT).then(()=>{
    console.log('db create successfull')
})
.catch(err=>console.log(err))
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server runninng`)
})