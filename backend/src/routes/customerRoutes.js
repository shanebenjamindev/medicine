const express = require("express");
const router = express.Router()
const customerController = require('../controllers/customerController');

router.post('/sign-up', customerController.createCustomer)
router.post('/sign-in', customerController.loginCustomer)
router.post('/log-out', customerController.logoutCustomer)
router.put('/update-customer/:id', customerController.updateCustomer)
router.delete('/delete-customer/:id', customerController.deleteCustomer)

router.get('/', customerController.getAllCustomer)

router.get('/get-details/:id', customerController.getDetailsCustomer)
router.post('/refresh-token', customerController.refreshToken)
// router.post('/delete-many', customerController.deleteMany)


module.exports = router