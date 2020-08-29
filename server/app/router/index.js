const UserRoute = require('./user')

module.exports = app => {
    app.use('/user', UserRoute)
}