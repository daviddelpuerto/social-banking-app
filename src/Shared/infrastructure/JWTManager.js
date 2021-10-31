import jwt from 'jsonwebtoken';
import fse from 'fs-extra';

const publicKey = fse.readFileSync('./config/secrets/public.pem', 'utf-8');
const privateKey = fse.readFileSync('./config/secrets/private.pem', 'utf-8');
const tokenOptions = {
  expiresIn: 900,
  algorithm: 'RS256',
};

export default class JWTManager {
  static createToken(payload) {
    const data = typeof payload === 'object' ? payload : { payload };
    return jwt.sign(data, privateKey, tokenOptions);
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, publicKey, tokenOptions);
    } catch (error) {
      return false;
    }
  }
}
