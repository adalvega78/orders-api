import { SwaggerDefinition } from 'swagger-jsdoc';

class Swagger {
  static configure(port: (string | number)): SwaggerDefinition {
    const swaggerDefinition = {
      openapi: "3.0.0",
      info: {
        title: 'Orders API',
        version: '1.0.0',
        description: 'This is the Example API documentation and is using the OpenAPI spec.',
      },
      host: `localhost:${port.toString()}`,
      basePath: '/'
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