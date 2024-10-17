
import { User } from "../models/user.js";
import {z} from 'zod'
import bcryptjs from 'bcryptjs'
import { generateTokenAndSetCookie } from "../utils/generatetoken.js";

const schema=z.object({
    username:z.string(),
    password:z.string().min(8,"password must contain atleast 8 characters"),
    email:z.string().email('invalid email format')
})


export async function signup(req,res){
    try{

    
    const { email, password, username } = req.body;

    if(!email||!password||!username){
        return res.status(411).json({
            success:false,
            message:"all fields are required"
        })
    }
    const {success}=schema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"incoorect input"
        })
    }
    
    const existinguserbyemail=await User.findOne({
        email:email
    })
    if(existinguserbyemail){
        return res.status(411).json({
            message:"user already exist"
        })
    }

    const existingUserByUsername = await User.findOne({ username: username });

	if (existingUserByUsername) {
		return res.status(400).json({ success: false, message: "Username already exists" });
	}


   

    const salt=await bcryptjs.genSalt(10);
    const hashedpassword=await bcryptjs.hash(password, salt)

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

	const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    
    const newUser = await new User({
        email,
        password:hashedpassword,
        username,
        image
    });
    const token=generateTokenAndSetCookie(newUser._id, res)
    await newUser.save();
    //return all the info of the new user to the user except password
    res.status(201).json({success:true, user:{
        ...newUser._doc,
        password:"",
        token:token
        
    },
    });



    }catch(error){
        console.log("Error in signup controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const siginbody=z.object({
    email:z.string().email(),
    password:z.string().min(6)
})
export async function login(req,res){
    try{
        
        const{email, password}=req.body;
        if(!email||!password){
            res.status(411).json({
                message:"all fiels should be filler"
            })
        }
        const {success}=siginbody.safeParse(req.body);
        if(!success){
            res.status(411).json({
                message:"incorrect credetials"
            })
        }
        const existinguser=await User.findOne({email:email})
        if(!existinguser){
            res.status(411).json({
                message:"user doent exist"
            })
        }
        

        const ispasscorrect=await bcryptjs.compare(password, existinguser.password);
        
        if(ispasscorrect){
            
            const token=generateTokenAndSetCookie(existinguser._id, res);
            res.status(201).json({
                success:true,
                user:{
                    ...existinguser._doc,
                    password:"",
                    token:token
                },
            });
            
        }else{
            res.json({
                message:"pass incorrect"
            })
        }
    }catch(error){
        console.log("Error in login controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
    }
    

    

}
export function logout(req,res){
    try {
        res.clearCookie("jwt-netflix")
        res.status(200).json({
            success:true,
            message:"Logged out successfully"
        })
        
    } catch (error) {
        res.status(500)({
            success:false,
            message:"error logging out"
        })
        
    }
}

export async function authcheck(req,res){
    try {

        res.status(200).json({
            success:true,
            user:req.user
        })
        
    } catch (error) {
        console.log("error in auth check", error.message);
        res.status(500).json({success:false , message:"Internal server error"});
    }
}

