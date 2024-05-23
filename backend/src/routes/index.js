
const routes = (app) => {
    app.use('/api/jobs', JobRouter)
    app.use('/api/user', UserRouter)
}

module.exports = routes