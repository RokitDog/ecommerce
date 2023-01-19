import nextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next'
import {connectDb, disconnectDb} from '../../../utils/db'
import User, { UserTypes } from '../../../models/User';
import {  createResetToken } from '../../../utils/tokens';
import { sendEmail } from '../../../utils/sendMail';
import { resetEmailTemplate } from '../../../emails/resetEmailTemplate';
import { json } from 'stream/consumers';
import bcrypt from 'bcrypt'

const handler = nextConnect();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  
    try {
        await connectDb();
        const {user_id, password} = req.body;
        const user = await User.findById(user_id)
        if(!user) {
            return res.status(400).json({message: 'This Account does not exist.'})
        }
        const cryptedPassword = await bcrypt.hash(password, 12)
        await user.updateOne({
            password: cryptedPassword
        })

        res.json({email: user.email})

        await disconnectDb();
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
});

export default handler;