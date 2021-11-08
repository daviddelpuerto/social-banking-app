import { Container } from 'typedi';
import httpStatus from 'http-status';
import sendFollowRequest from '../../../../modules/Users/application/sendFollowRequest';
import UserNotFound from '../../../../Shared/domain/Users/domain/errors/UserNotFound';
import UserFollowHimself from '../../../../modules/Users/domain/errors/UserFollowHimself';
import AlreadyRequestedToFollowUser from '../../../../modules/Users/domain/errors/AlreadyRequestedToFollowUser';
import RoutesResponsesErrorManager from '../../../../Shared/domain/RoutesResponsesErrorManager';

const logger = Container.get('logger');

export default async (req, res) => {
  try {
    const { identifier } = req.params;
    const { decodedToken } = req;

    const requesterUserEmail = decodedToken.payload;

    await sendFollowRequest({ requesterUserEmail, identifier });

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    logger.error(error.stack, { req });

    if (error instanceof UserNotFound) {
      return res.status(httpStatus.NOT_FOUND).json(RoutesResponsesErrorManager.getResponse(error));
    } if (error instanceof UserFollowHimself) {
      return res.status(httpStatus.BAD_REQUEST).json(RoutesResponsesErrorManager.getResponse(error));
    } if (error instanceof AlreadyRequestedToFollowUser) {
      return res.status(httpStatus.BAD_REQUEST).json(RoutesResponsesErrorManager.getResponse(error));
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};
