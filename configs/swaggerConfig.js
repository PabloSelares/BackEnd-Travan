// swaggerConfig.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger Travan API',
      version: '1.0.0',
      description: 'Documentação da API feita com Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./src/routers/*.js'], // Caminho para os arquivos com as rotas e comentários JSDoc
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
