import { Container } from 'typedi';
import httpStatus from 'http-status';
import createUser from '../../../../modules/Users/application/createUser';
import EmailAlreadyExists from '../../../../modules/Users/domain/errors/EmailAlreadyExists';
import RoutesResponsesErrorManager from '../../../../Shared/domain/RoutesResponsesErrorManager';

const logger = Container.get('logger');

export default async (req, res) => {
  try {
    const {
      firstName, lastName, age, email, password, balance,
    } = req.body;

    await createUser({
      firstName, lastName, age, email, password, balance,
    });

    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    logger.error(error.stack, { req });

    if (error instanceof EmailAlreadyExists) {
      return res.status(httpStatus.BAD_REQUEST).json(RoutesResponsesErrorManager.getResponse(error));
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};
