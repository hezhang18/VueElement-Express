const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { Schema, model } = mongoose

const UserSchema = new Schema({
    userid: {type: String, require: true},
    password: {
        type: String, 
        require: true,
        set(val) {
            return bcrypt.hashSync(val, 10)
        }
    },
    username: {type: String, require: true},
    isAdmin: {type: String, default: '0'}
})

const User = model('User', UserSchema)

module.exports = User