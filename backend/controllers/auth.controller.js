import User  from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async(req,res) =>{
    try {
        const {fullName,username,password,confirmPassword, gender} = req.body;
        console.log("usr",username)
        if(password !== confirmPassword){
            return res.status(400).json({error:"passwords don't match"})
        }

        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error:"Usernamee already exists"})
        }


        //Hash Password Here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //https://avatar-placeholder.iran.liara.run/

        const boyProfilePic = 'https://avatar.iran.liara.run/public/boy?username=${username}'
        const girlProfilePic = 'https://avatar.iran.liara.run/public/girl?username=${username}'

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        })

       if(newUser){
        //Generate JWT Token
         generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            _id:newUser._id,
            fullName: newUser.fullName,
            username:newUser.username,
            profilePic:newUser.profilePic
        })
       }else{
        res.status(400).json({error:"Something went wrong"})
       }
    }
    catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
    
    
};

export const login = (req,res) =>{
    console.log("loginUser");
}
export const logout = (req,res) =>{
    console.log("logoutUser");
}