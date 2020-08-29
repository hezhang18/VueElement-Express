const mongoose = require('mongoose')
const mongoUrl = 'mongodb://name:pass@127.0.0.1:27017/dev'

module.exports = app => {
    mongoose.connect(mongoUrl, {useNewUrlParser: true, useFindAndModify: true}, ()=>{
        console.log('mongodb connect');
    })
}

