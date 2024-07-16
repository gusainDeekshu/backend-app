const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const usermodel = require("../model/usermodel");
const { log } = require("console");
require('dotenv').config()
// login user
const loginuser = async (req, res) => {
  const {email,password}=req.body;
  try {
    const user=await usermodel.findOne({email})
    if(!user){
      return res.json({ success: false, message: "User does not exist" });
    }
    // const
  } catch (error) {
    
  }
};
const createtoken = (id) => {
  return jwt.sign({ id },process.env.JWT_SECRET);
};

//register user
const registeruser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //check is user already exists
    const exists = await usermodel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }
    //validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter  a strong password",
      });
    }
    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    //creating new user
    const newuser = new usermodel({
      name: name,
      email: email,
      password: hashedpassword,
    });
    const user = await newuser.save();
    const token = createtoken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message:error });
  }
};

module.exports = { loginuser, registeruser };
