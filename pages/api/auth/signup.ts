import nextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next'
import {connectDb, disconnectDb} from '../../../utils/db'
import { validateEmail } from '../../../utils/validation';
import User, { UserTypes } from '../../../models/User';
import bcrypt from 'bcrypt';
import { createActivationToken } from '../../../utils/tokens';
import { sendEmail } from '../../../utils/sendMail';
import { activateEmailTemplate } from '../../../emails/activateEmailTemplate';

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  
    try {
        await connectDb();
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            res.status(400).json({message: 'Please fill in all fields'})
        }
        if(!validateEmail(email)){
            return res.status(400).json({message: 'Invalid Email'})
        }
        const user = await User.findOne({email})
        if(user) {
            return res.status(400).json({message: 'This email is already in use'})
        }
        if(password.length<6) {
            return res.status(400).json({message: 'Passwords must be at least 6 characters long'})
        }
        const cryptedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({name, email, password: cryptedPassword})
        const addedUser: UserTypes = await newUser.save();
        const payload = addedUser._id.toString();
        const activation_token = await createActivationToken(
            payload
        );
        const url = `${process.env.BASE_URL}/activate${activation_token}`
        sendEmail({to: email, url, txt: '', subject: "Please Activate Your Account", template: activateEmailTemplate});
        await disconnectDb();
        res.json({message: 'Register success! Please activate your email to start.'})
        
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
});

export default handler;