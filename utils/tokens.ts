import jwt from 'jsonwebtoken';

export const createActivationToken = async (payload: string) => {
  return jwt.sign({payload}, process.env.ACTIVATION_TOKEN_SECRET!, {
    expiresIn: '2d',
  });
};

type Props = {
  id: string;
};

export const createResetToken = async ({id}: Props) => {
  return jwt.sign({id}, process.env.RESET_TOKEN_SECRET!, {
    expiresIn: '6h',
  });
};
