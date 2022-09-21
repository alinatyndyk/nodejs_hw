const {WELCOME, ORDER_ARRIVED, FORGOT_PASSWORD} = require("../constants/emailAction.enum");

module.exports = {
    [WELCOME]: {
        subject: 'Welcome',
        templateName: 'welcome'
    },
    [ORDER_ARRIVED]: {
        subject: 'ORDER ARRIVED',
        templateName: 'order_arrived'
    },
    [FORGOT_PASSWORD]: {
        subject: 'FORGOT PASSWORD',
        templateName: 'forgot_password'
    }
}