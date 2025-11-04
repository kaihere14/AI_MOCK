import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const generatAccessRefresh = async(userId)=>{
 try{
  if(!userId){
    throw new Error("User ID is required");
  }
  const accessToken =   jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:'15m'})
  const refreshToken =  jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:'7d'})
  if(!refreshToken){
    throw new Error("Failed to gener  ate refresh token");
  }
  return {accessToken, refreshToken}

 }catch (error){
  return res.status(500).json({"message":"Internal server error"})
 }
}

export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if(!email||!password||!name){
      return res.status(400).json({ message: "PLease enter all the fields"});
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ email, password, name });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error',error})
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const returnUser = await User.findOne({ email });
    const { accessToken, refreshToken } = await generatAccessRefresh(user._id);
    res.status(200).json({ message: 'Login successful', returnUser, accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error'});
  }
};