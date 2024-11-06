const { UserModel } = require("../models/UserModel");

async function validateMiddleware(req,res,next){
    const {email,password} = req.body;
    const existingUser = await UserModel.findOne({email})
    console.log(existingUser)
    if(existingUser){
      return res.status(400).send("User is already exists")
    }
    
    if(!email.includes('@')){
      return res.status(400).send("Email must contain '@' and be in a valid format.")
    }

    if(!/[A-Z]/.test(password)){
      return res.status(400).send("Password should contain at list one uppercase character")
    }

    if(!/[0-9]/.test(password)){
        return res.status(400).send("Password should contain at list one number")
    }

    if(!/[!@#$%^&*]/.test(password)){
        return res.status(400).send("Password should contain at list one special character")
    }

    next()

}

module.exports = validateMiddleware