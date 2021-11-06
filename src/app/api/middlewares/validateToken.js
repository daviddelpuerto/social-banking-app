import { Container } from 'typedi';
import httpStatus from 'http-status';
import JWTMananger from '../../../Shared/infrastructure/JWTManager';

const logger = Container.get('logger');

export default async function validateToken(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    const [bearer, token] = authorization.split(' ');

    if (!bearer || bearer.toLowerCase() !== 'bearer' || !token) {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    const isValidToken = await JWTMananger.verifyToken(token);

    if (!isValidToken) {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    req.decodedToken = isValidToken;

    return next();
  } catch (error) {
    logger.error(error.stack, { req });
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
