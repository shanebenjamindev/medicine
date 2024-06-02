const userRouter = require('./userRoutes')
const customerRouter = require('./customerRoutes')
const saleRouter = require('./saleRoutes')
const supplierRouter = require('./supplierRoutes')

const routes = (app) => {
    app.use('/api/customer', customerRouter)
    app.use('/api/user', userRouter)
    // app.use('/api/sale', saleRouter)
    // app.use('/api/supplier', supplierRouter)
}

module.exports = routes