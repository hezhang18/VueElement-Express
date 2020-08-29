const express = require('express')
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

// 加密加盐
const { secret } = require('../config/key')

// 验证身份-中间件
const isAdmin = async (req, res, next) => {
    const token = req.headers.authorization.split(' ').pop()
    const { _id, userid } = jwt.verify(token, secret)

    const user = await User.findById(_id)
    if(!user) {return res.status(422).send('用户错误')}
    if(userid !== user.userid) {
        return res.status(422).send('用户错误')
    }else {
        if(user.isAdmin === '0') {
            res.status(400).send('没有权限')
        }else if(user.isAdmin === '1') {
            next()
        }
    }
}

// 查询用户列表
router.get('/', isAdmin, async(req, res) => {
    const list = await User.find({}, (req, res)=>{})
    res.send(list)
})

// 注册
router.post('/register',async(req, res) => {
    const user = await User.findOne({userid: req.body.userid})
    if(user) {return res.status(409).send('该用户已存在')}
    const newUser = await new User(req.body).save()
    res.send(newUser)
})

// 登录
router.post('/login', async(req, res) => {
    const user = await User.findOne({userid: req.body.userid})
    if(!user) {return res.status(422).send('该用户不存在')}
    let isPassword = bcrypt.compareSync(req.body.password, user.password)
    if(!isPassword) {return res.status(422).send('密码错误')}
    const {_id, userid} = user
    const token = jwt.sign({_id, userid}, secret, {expiresIn: '24h'})
    res.send(token)
})

// 临时验证接口
router.get('/verify', async(req, res) => {

})



module.exports = router