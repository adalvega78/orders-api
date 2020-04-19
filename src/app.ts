import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as logger from 'morgan';
import Routes from './api/routes/interfaces/routes.interface';
import errorMiddleware from './api/middlewares/error.middleware';
import DbClient from './persistence/helpers/dbClient';
import * as swaggerUi from 'swagger-ui-express';
import Swagger from './swagger';
import authorizationMiddleware from './api/middlewares/authorization';
import { unless } from './api/middlewares/authorization';

class App {
  public app: express.Application;
  public port: (string | number);
  public env: boolean;

  private readonly DocumentationRoute = '/docs';

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV === 'production' ? true : false;

    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.initializeSwagger();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port.toString()}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    if (this.env) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(logger('combined'));
      this.app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
    } else {
      this.app.use(logger('dev'));
      this.app.use(cors({ origin: false, credentials: true }));
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use(unless(this.DocumentationRoute, authorizationMiddleware), route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeDatabase() {
    // Connect to MongoDB
    DbClient.connect();
  }

  private initializeSwagger() {
    const swaggerSpec = Swagger.configure(this.port);
    if (swaggerSpec) {
      const swaggerUiOptions = {
        customSiteTitle: 'Orders Api Docs',
        swaggerOptions: {
          oauth: {
            clientId: "my-client-id",
            clientSecret: "my-client-secret",
            usePkceWithAuthorizationCodeGrant: true
          }
        }
      };
      this.app.use(this.DocumentationRoute, swaggerUi.serve);
      this.app.get(this.DocumentationRoute, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
    }
  }

}

export default App;
