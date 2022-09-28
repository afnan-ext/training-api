"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const usersValidation_1 = require("../utils/usersValidation");
const router = express_1.default.Router();
router.post('/get-otp', usersValidation_1.getOtpValidation, users_1.getOtp);
router.post('/verify-otp', usersValidation_1.verifyOtpValidation, users_1.verifyOtp);
router.post('/update/:id', usersValidation_1.updateProfileValidation, users_1.updateProfile);
exports.default = router;
