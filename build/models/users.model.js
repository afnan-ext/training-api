"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    mobile: {
        type: String,
        required: true,
        index: { unique: true },
    },
    firstname: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        required: false,
    },
    otp: {
        type: String,
        required: false,
    },
    updateOtp: {
        type: Date,
        required: false,
    }
});
userSchema.method('toJSON', function () {
    var obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    delete obj.password;
    return obj;
});
exports.default = mongoose_1.default.model("users", userSchema);
