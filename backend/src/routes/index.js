const userRouter = require('./userRoutes')
const medicineRouter = require('./medicineRoutes')
const saleRouter = require('./saleRoutes')
const supplierRouter = require('./supplierRoutes')

const routes = (app) => {
    // app.use('/api/medicine', medicineRouter)
    app.use('/api/user', userRouter)
    // app.use('/api/sale', saleRouter)
    // app.use('/api/supplier', supplierRouter)
}

module.exports = routes