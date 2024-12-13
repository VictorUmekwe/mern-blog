import User from "../models/userModels.js" 
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body

  //check if all fields are entered
  if(!username || !email || !password || username === '' || email === '' || password === ''){
    next(errorHandler(400, 'All fields are required'));
  };

  // hash password
   const salt = await bcryptjs.genSalt()
   const hashed = await bcryptjs.hash(password, salt) 


  try {
    const user = await User.create({username, email, password: hashed})
    res.status(200).json({message: 'User created', user})
  } catch (error) {
    next(error);
  }
  
}


export {signUp}