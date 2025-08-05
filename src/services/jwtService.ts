import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { JWT_KEY } from '../config/enviroment';

const secretKey = JWT_KEY;


export const jwtService = {
  signToken: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, secretKey, { expiresIn: expiration });
  },

  verifyTokenSync: (token: string) => {
    return jwt.verify(token, secretKey);
  }  
}
