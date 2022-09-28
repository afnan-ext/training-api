import express from 'express';
import { getOtp, verifyOtp, updateProfile } from '../controllers/users';
import { getOtpValidation, verifyOtpValidation, updateProfileValidation } from '../utils/usersValidation';
const router = express.Router();

//getOtp api 
router.post('/get-otp', getOtpValidation, getOtp)

//verify api 
router.post('/verify-otp', verifyOtpValidation, verifyOtp)

//update api 
router.post('/update/:id', updateProfileValidation, updateProfile)

export default router;
