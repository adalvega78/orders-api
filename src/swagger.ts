import { SwaggerDefinition } from 'swagger-jsdoc';

class Swagger {
  static configure(port: (string | number)): SwaggerDefinition {
    const swaggerDefinition = {
      openapi: "3.0.0",
      info: {
        title: 'Orders API',
        version: '1.0.0',
        description: 'Orders API documentation',
      },
      host: `localhost:${port.toString()}`,
      basePath: '/',
      components: {
        securitySchemes: {
          OrdersApiOAuth2: {
            type: 'oauth2',
            description: 'This API uses OAuth 2 with the implicit grant flow.',
            flows: {
              clientCredentials: {
                tokenUrl: 'https://dev-697175.okta.com/oauth2/default/v1/token',
                scopes: {
                  'orders-api': 'full access'
                }
              }
            }
          }
        }
      }
      // security: {
      //   oAuthSample: {
      //     order-api
      //   }
      // }
    };

    const path = require('path');

    const swaggerOptions = {
      swaggerDefinition: swaggerDefinition, // swagger definition
      apis: [
        path.join(__dirname, './*.ts'),
        path.join(__dirname, './**/*.ts')
      ]
    };
    const swaggerJSDoc = require('swagger-jsdoc');
    return swaggerJSDoc(swaggerOptions);
  }

}
export default Swagger;