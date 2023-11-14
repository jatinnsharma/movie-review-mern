const express = require('express');

const { create, verifyEmail, resendEmailVerificationToken, forgetPassword } = require('../controllers/user');
const { userValidator, validate } = require('../middlewares/validator');
const { isValidPassResetToken } = require('../middlewares/user');

const router = express.Router()

router.post('/create',userValidator,validate,create)
router.post('/verify-email',verifyEmail)
router.post('/resend-email-verification-token',resendEmailVerificationToken)
router.post('/forget-password',forgetPassword)
router.post('/verify-password-reset-token',isValidPassResetToken,(req,res)=>{
    res.json({valid:true})
})


module.exports = router;