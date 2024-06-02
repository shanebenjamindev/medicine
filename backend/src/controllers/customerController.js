const customerService = require('../services/customerService')
// const JwtService = require('../services/JwtService')

const createCustomer = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password || !confirmPassword || !name) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Please correct the email'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is not the same'
            })
        }
        const response = await customerService.createCustomer(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Please correct the email'
            })
        }
        const response = await customerService.loginCustomer(req.body)
        const { refresh_token, ...newReponse } = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
        })
        return res.status(200).json({ ...newReponse, refresh_token })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateCustomer = async (req, res) => {
    try {
        const CustomerId = req.params.id
        const data = req.body
        if (!CustomerId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The CustomerId is required'
            })
        }
        const response = await customerService.updateCustomer(CustomerId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const CustomerId = req.params.id
        if (!CustomerId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The CustomerId is required'
            })
        }
        const response = await customerService.deleteCustomer(CustomerId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await customerService.deleteManyCustomer(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getAllCustomer = async (req, res) => {
    try {
        const response = await customerService.getAllCustomer()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsCustomer = async (req, res) => {
    try {
        const CustomerId = req.params.id
        if (!CustomerId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The CustomerId is required'
            })
        }
        const response = await customerService.getDetailsCustomer(CustomerId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.headers.cookie

        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const logoutCustomer = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createCustomer,
    loginCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomer,
    getDetailsCustomer,
    refreshToken,
    logoutCustomer,
}
