import JWT from "jsonwebtoken";
import userModel from '../models/userModel.js'

// yesle garda route protect garna milxaaa
//Protected routes token base ... user lai protect garinxa token base ma

export const requireSignIn = async (req,res,next)=>{
    // verify ko function milxa compare garna , token header ko vitra ko authorization use garinxa
    try{
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user = decode;
        next()
    }
    catch(err){
        console.log(err)
        res.status(400).send({
            success:false,
            error,
            message:"eerror in require sign in page "
        })
    }
}


// ADMIN ACCESS

export const isAdmin = async (req, res ,next ) =>{
    try{
        const user = await userModel.findById(req.user._id)
        if(user.role != 1 ){
            return res.status(401).send({
                success:false,
                message:"unAuthorized access"
            })
        }else{
            next()
        }
    }
    catch(err) {
        console.log(err)
        res.status(400).send({
            success:false,
            error,
            message:"eerror in admin middleware"
        })
    }
}


