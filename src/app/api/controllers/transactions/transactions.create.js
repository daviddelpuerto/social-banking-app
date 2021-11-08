import { Container } from 'typedi';
import httpStatus from 'http-status';
import createTransaction from '../../../../modules/Transactions/application/createTransaction';
import UserSendingMoneyToHimself from '../../../../Shared/domain/Users/domain/errors/UserSendingMoneyToHimself';
import UsersDontFollowEachOther from '../../../../Shared/domain/Users/domain/errors/UsersDontFollowEachOther';
import UserHasInsufficientBalance from '../../../../Shared/domain/Users/domain/errors/UserHasInsufficientBalance';
import RoutesResponsesErrorManager from '../../../../Shared/domain/RoutesResponsesErrorManager';

const logger = Container.get('logger');

export default async (req, res) => {
  try {
    const { receiverAccount, balance } = req.body;
    const { decodedToken } = req;

    const senderEmail = decodedToken.payload;

    await createTransaction({ senderEmail, receiverAccount, balance });

    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    logger.error(error.stack, { req });

    if (error instanceof UserSendingMoneyToHimself) {
      return res.status(httpStatus.BAD_REQUEST).json(RoutesResponsesErrorManager.getResponse(error));
    } if (error instanceof UsersDontFollowEachOther) {
      return res.status(httpStatus.BAD_REQUEST).json(RoutesResponsesErrorManager.getResponse(error));
    } if (error instanceof UserHasInsufficientBalance) {
      return res.status(httpStatus.BAD_REQUEST).json(RoutesResponsesErrorManager.getResponse(error));
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};
