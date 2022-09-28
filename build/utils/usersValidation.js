"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileValidation = exports.verifyOtpValidation = exports.getOtpValidation = void 0;
const getOtpValidation = (req, res, next) => {
    const { mobile } = req.body;
    const errors = [];
    if (!mobile) {
        errors.push({ message: "mobile field is required" });
    }
    else if (typeof mobile !== 'string') {
        errors.push({ message: "mobile field must be string" });
    }
    else if (mobile.length !== 10) {
        errors.push({ message: "mobile must be 10 digit" });
    }
    errors.length ? res.status(400).json({ status: "false", errors }) : next();
};
exports.getOtpValidation = getOtpValidation;
const verifyOtpValidation = (req, res, next) => {
    const { mobile, otp } = req.body;
    const errors = [];
    if (!mobile) {
        errors.push({ message: "mobile field is required" });
    }
    else if (typeof mobile !== 'string') {
        errors.push({ message: "mobile field must be string" });
    }
    else if (mobile.length !== 10) {
        errors.push({ message: "mobile must be 10 digit" });
    }
    !otp && errors.push({ message: "otp field is required" });
    errors.length ? res.status(400).json({ status: "false", errors }) : next();
};
exports.verifyOtpValidation = verifyOtpValidation;
const updateProfileValidation = (req, res, next) => {
    const { firstname, lastname, email, address, gender } = req.body;
    const errors = [];
    !firstname && errors.push({ message: "firstname field is required" });
    !lastname && errors.push({ message: "lastname field is required" });
    if (!email) {
        errors.push({ message: "email field is required" });
    }
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
        errors.push({ message: "email is not valid" });
    }
    !address && errors.push({ message: "address field is required" });
    if (!gender) {
        errors.push({ message: "gender field is required" });
    }
    else if (gender !== 'male' && gender !== 'female') {
        errors.push({ message: "gender field  should be contains male or female" });
    }
    errors.length ? res.status(400).json({ status: "false", errors }) : next();
};
exports.updateProfileValidation = updateProfileValidation;
