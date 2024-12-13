import User from "../models/userModels.js" 
import bcryptjs from "bcryptjs"

const signUp = async (req, res) => {
  const { username, email, password } = req.body

  //check if all fields are entered
  if(!username || !email || !password || username === '' || email === '' || password === ''){
    return res.status(400).json({message: 'All fields required'})
  };

  // hash password
   const salt = await bcryptjs.genSalt()
   const hashed = await bcryptjs.hash(password, salt) 


  try {
    const user = await User.create({username, email, password: hashed})
    res.status(200).json({message: 'User created', user})
  } catch (error) {
    res.status(500).json(error.message)
  }
  
}


export {signUp}