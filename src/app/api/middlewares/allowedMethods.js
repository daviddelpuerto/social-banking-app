import config from 'config';

export default (req, res, next) => {
  if (!config.ALLOWED_METHODS.includes(req.method)) {
    return res.status(405).end();
  }

  return next();
};
