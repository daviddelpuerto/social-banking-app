import http from 'http';
import express from 'express';
import { Container } from 'typedi';
import { errors } from 'celebrate';
import middlewares from './api/middlewares';
import routes from './api/routes';
import bootsrap from '../Shared/infrastructure/bootstrap';

const logger = Container.get('logger');

const app = express();
const server = http.createServer(app);

app.use(middlewares.cors());
app.use(middlewares.helmet());
app.use(middlewares.allowedMethods);
app.use(middlewares.requestIp.mw());
app.use(middlewares.requestId({ setHeader: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(middlewares.compression());
app.use(middlewares.bitnaclExpress.logger());
app.use(routes);
app.use(errors());

app.all('*', middlewares.routeNotFound);

bootsrap()
  .then(() => {
    server.listen(process.env.NODE_PORT, (error) => {
      if (error) {
        logger.info(error.stack);
        process.exit(1);
      }

      logger.info(`Server listening on port: ${process.env.NODE_PORT}`);
      logger.info(`Running environment: ${process.env.NODE_ENV}`);
    });
  })
  .catch((error) => logger.error(error.stack));
