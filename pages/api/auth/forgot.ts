import nextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next'
import {connectDb, disconnectDb} from '../../../utils/db'
import User, { UserTypes } from '../../../models/User';
import {  createResetToken } from '../../../utils/tokens';
import { sendEmail } from '../../../utils/sendMail';
import { resetEmailTemplate } from '../../../emails/resetEmailTemplate';

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  
    try {
        await connectDb();
        const {email} = req.body;
        const user = await User.findOne<UserTypes>({email})
        if(!user) {
            return res.status(400).json({message: 'This email does not exist.'})
        }
        const user_id = await createResetToken({
            id: user._id.toString(),
        })
        const url = `${process.env.BASE_URL}/auth/reset/${user_id}`
        sendEmail({to: email, url, txt: '', subject: "Reset your password", template: resetEmailTemplate});
        await disconnectDb();
        res.json({message: 'An Email has been sent to you, use it to reset your password'})
        
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
});

export default handler;