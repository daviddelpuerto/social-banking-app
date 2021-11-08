import { Container } from 'typedi';
import httpStatus from 'http-status';
import getUserData from '../../../../modules/Users/application/getUserData';
import UserNotFound from '../../../../modules/Users/domain/errors/UserNotFound';
import RoutesResponsesErrorManager from '../../../../Shared/domain/RoutesResponsesErrorManager';

const logger = Container.get('logger');

export default async (req, res) => {
  try {
    const { decodedToken } = req;

    const userEmail = decodedToken.payload;

    const response = await getUserData(userEmail);

    return res.status(httpStatus.OK).json(response);
  } catch (error) {
    logger.error(error.stack, { req });

    if (error instanceof UserNotFound) {
      return res.status(httpStatus.NOT_FOUND).json(RoutesResponsesErrorManager.getResponse(error));
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};
