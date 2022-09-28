import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/users.model";
import bcrypt from "bcrypt";

export const getOtp = async (req: Request, res: Response) => {
  try {
    const { mobile } = req.body;
    const user = await userModel.findOne({ mobile });
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    if (user) {
      (user.otp = otp), (user.updateOtp = new Date());
      const result = await user.save();
      const { firstname, lastname, email, gender, address } = user;
      const profileUpdated = firstname && lastname && email && gender !== undefined && address;
      
      res.status(200).json({ ...result.toJSON(), profileUpdated: !!profileUpdated });
    } else {
      const data = {
        mobile,
        createdAt: new Date(),
        otp: otp,
        updateOtp: new Date(),
      };
      const userInstance = new userModel(data);
      console.log("1234");

      const result = await userInstance.save();
      console.log("123445");

      res.status(200).json({ ...result.toJSON(), profileUpdated: false });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong!", error: e });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { mobile, otp } = req.body;
    const user = await userModel.findOne({ mobile });
    if (user) {
      if(otp === user.otp) {
        console.log(user)
        const token = jwt.sign(user.toJSON(), `${process.env.JWT_SECRET}`, {
          expiresIn: "2h",
        });
        const { firstname, lastname, email, gender, address } = user; 
        const profileUpdated = firstname && lastname && email && gender !== undefined && address;
        res.status(200).json({...user.toJSON(), token, profileUpdated: !!profileUpdated});
      } else {
        res.status(401).json({ status: false,  message: "You have entered wrong otp" });
      }
    } else {
      
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong!", error: e });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOne({_id: id});
    if (user) {
      const { firstname, lastname, email, gender, address } = req.body; 
      user.firstname = firstname;
      user.lastname = lastname;
      user.email = email;
      user.gender = gender;
      user.address = address;
      const result = await user.save();
      const token = jwt.sign(result.toJSON(), `${process.env.JWT_SECRET}`, {
        expiresIn: "2h",
      });
      res.status(200).json({...result.toJSON(), token, updateProfile: true});
    } else {
      res.status(404).json({status: false, message: "Cannot find id"});
    }
  } catch (e: any) {
    res.status(500).json({ status: false, message: "Something went wrong!", error: e });
  }
};
