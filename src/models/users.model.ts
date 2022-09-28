import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

userSchema.method('toJSON', function() {
  var obj:any = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  delete obj.password;

  return obj;
});

export default mongoose.model("users", userSchema);
