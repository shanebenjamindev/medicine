const Customer = require("../models/customerModel")
const bcrypt = require("bcryptjs")
const { genneralAccessToken, genneralRefreshToken } = require("./jwtService")

const createCustomer = (newCustomer) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password } = newCustomer
        try {
            const checkCustomer = await Customer.findOne({
                email: email
            })
            if (checkCustomer !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already exits'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdCustomer = await Customer.create({
                name,
                email,
                password: hash,
            })
            if (createdCustomer) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdCustomer
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginCustomer = (CustomerLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = CustomerLogin
        try {
            const checkCustomer = await Customer.findOne({
                email: email
            })
            if (checkCustomer === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Customer is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkCustomer.password)

            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or Customer is incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkCustomer.id,
                isAdmin: checkCustomer.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id: checkCustomer.id,
                isAdmin: checkCustomer.isAdmin
            })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                CustomerData: checkCustomer,
                access_token,
                refresh_token
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateCustomer = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCustomer = await Customer.findOne({
                _id: id
            })
            if (checkCustomer === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Customer is not defined'
                })
            }

            const updatedCustomer = await Customer.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedCustomer
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteCustomer = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCustomer = await Customer.findOne({
                _id: id
            })
            if (checkCustomer === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Customer is not defined'
                })
            }

            await Customer.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete Customer success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyCustomer = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {

            await Customer.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete Customer success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllCustomer = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allCustomer = await Customer.find().sort({ createdAt: -1, updatedAt: -1 })
            resolve({
                status: 'OK',
                message: 'Success',
                data: allCustomer
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsCustomer = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Customer = await Customer.findOne({
                _id: id
            })
            if (Customer === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Customer is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: Customer
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createCustomer,
    loginCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomer,
    getDetailsCustomer
}