import { Container } from 'typedi';
import httpStatus from 'http-status';
import declineFollowRequest from '../../../../modules/Users/application/declineFollowRequest';
import UserNotFound from '../../../../modules/Users/domain/errors/UserNotFound';
import RoutesResponsesErrorManager from '../../../../Shared/domain/RoutesResponsesErrorManager';

const logger = Container.get('logger');

export default async (req, res) => {
  try {
    const { userId } = req.params;
    const { decodedToken } = req;

    const userEmailDecliningTheRequest = decodedToken.payload;

    await declineFollowRequest({ userEmailDecliningTheRequest, userId });

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    logger.error(error.stack, { req });

    if (error instanceof UserNotFound) {
      return res.status(httpStatus.NOT_FOUND).json(RoutesResponsesErrorManager.getResponse(error));
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};
