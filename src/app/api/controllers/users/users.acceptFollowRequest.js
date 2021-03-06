import { Container } from 'typedi';
import httpStatus from 'http-status';
import acceptFollowRequest from '../../../../modules/Users/application/acceptFollowRequest';
import UserNotFound from '../../../../Shared/domain/Users/domain/errors/UserNotFound';
import AlreadyFollowingUser from '../../../../modules/Users/domain/errors/AlreadyFollowingUser';
import RoutesResponsesErrorManager from '../../../../Shared/domain/RoutesResponsesErrorManager';

const logger = Container.get('logger');

export default async (req, res) => {
  try {
    const { userId } = req.params;
    const { decodedToken } = req;

    const userEmailAcceptingTheRequest = decodedToken.payload;

    await acceptFollowRequest({ userEmailAcceptingTheRequest, userId });

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    logger.error(error.stack, { req });

    if (error instanceof UserNotFound) {
      return res.status(httpStatus.NOT_FOUND).json(RoutesResponsesErrorManager.getResponse(error));
    } if (error instanceof AlreadyFollowingUser) {
      return res.status(httpStatus.BAD_REQUEST).json(RoutesResponsesErrorManager.getResponse(error));
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};
