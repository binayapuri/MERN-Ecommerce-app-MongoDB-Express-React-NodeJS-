import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body
        // validation
        if (!name) {
            return res.send({ error: 'Name is  Required' })
        }
        if (!email) {
            return res.send({ error: 'email is  Required' })
        }
        if (!password) {
            return res.send({ error: 'password is  Required' })
        }
        if (!phone) {
            return res.send({ error: 'Phone number is  Required' })
        }
        if (!address) {
            return res.send({ error: 'address is  Required' })
        }

        // check user user 

        const existingUser = await userModel.findOne({ email:email })

        //existing user
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'already register please login'
            })
        }

        // register user 
        const hashedPassword = await hashPassword(password)

        // save

        const user = await new userModel({ name,email,address,phone,password:hashedPassword}).save()

        res.status(201).send({
            success: true,
            message: 'user registration successfully',
            user

        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "error in registeration",
            error
        })
    }
};

//  POST LOGIN 

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        // validate
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "re Email or Password"
            })
        }


        // check user 
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "email is not registered"
            })
        }



        //  compare password
        const match = await comparePassword(password, user.password)
        console.log(match)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'invalid password'
            })
        } 

        //token 

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });


// login status message
        res.status(200).send(
            {
                success: true,
                message: "login successfully",
                user: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address
                },
                token,
            }
        )

    }


    catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "error in login",
            error
        })
    }
}




// test controller

export const testController = (req,res)=>{
    res.send('protected route')
}