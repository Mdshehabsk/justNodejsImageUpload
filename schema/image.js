const mongoose = require('mongoose')

const image = new mongoose.Schema({
    image:{
        require:true,
        type:String
    }
})


const imageModel = new mongoose.model('imagemodel', image)

module.exports = imageModel