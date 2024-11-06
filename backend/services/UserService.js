const { UserModel } = require("../models/UserModel")
require("dotenv").config()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const BlackListModel = require("../models/TokenBlacklistModel")

class UserService {
    static async signup(userData){
         try {
           const existingUser = await UserModel.findOne({email:userData.email})
           if(existingUser){
             throw new Error('User with this email already exists');
           } 
           const hashedPassword = await bcrypt.hash(userData.password, 10)
           const user = await UserModel.create({...userData,password:hashedPassword})
           return user;
         } catch (error) {
            throw new Error({error: error.message});
         }
    }

    static async login(userData){
        const {email,password} = userData
        const user = await UserModel.findOne({email})
        if(!user){
          throw new Error('Invalid Email or Password')
        }

        const comparePassword = await bcrypt.compare(password,user.password)
        if(!comparePassword){
            throw new Error('Invalid Password')
        }
        
        const token = jwt.sign(
           {userId: user._id, email: user.email},
           process.env.secretKey,
           {expiresIn:'7d'}
        )

       return {user,token}
    }

    static async logout(token){
      const existingToken = await BlackListModel.findOne({token})
      if(existingToken){
        return {message:"Token is already blacklisted"}
      }
      const blacklistedToken = await BlackListModel.create({token})
      return {message: "User logged out successfully"}
    }
}

module.exports = UserService