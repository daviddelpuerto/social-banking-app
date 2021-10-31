import { Container } from 'typedi';
import httpStatus from 'http-status';
import loginUser from '../../../../modules/Users/application/loginUser';
import EmailAddressNotFound from '../../../../modules/Users/domain/errors/EmailAddressNotFound';
import InvalidPassword from '../../../../modules/Users/domain/errors/InvalidPassword';
import RoutesResponsesErrorManager from '../../../../Shared/domain/RoutesResponsesErrorManager';

const logger = Container.get('logger');

export default async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await loginUser({ email, password });

    return res.status(httpStatus.OK).json({ token });
  } catch (error) {
    logger.error(error.stack, { req });

    if (error instanceof EmailAddressNotFound) {
      return res.status(httpStatus.BAD_REQUEST).json(RoutesResponsesErrorManager.getResponse(error));
    } if (error instanceof InvalidPassword) {
      return res.status(httpStatus.BAD_REQUEST).json(RoutesResponsesErrorManager.getResponse(error));
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};
