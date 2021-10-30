/**
 * @HINT Export middlewares to use by your application in this file
 */

import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import requestId from 'express-request-id';
import requestIp from 'request-ip';
import bitnaclExpress from 'bitnacle-express';
import allowedMethods from './allowedMethods';
import routeNotFound from './routeNotFound';

export default {
  allowedMethods,
  bitnaclExpress,
  compression,
  cors,
  helmet,
  requestId,
  requestIp,
  routeNotFound,
};
