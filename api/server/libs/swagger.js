const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Line Trip API",
      description: "Line Trip API Informations",
      contact: {
        name: "Line Trip"
      },
      server: ["http://127.0.0.1:1233"]
    },
    security: [{ basicAuth: [] }],
    securityDefinitions: {
      basicAuth: {
        type: "apiKey",
        name: "Authorization",
        scheme: "basic",
        in: "header"
      }
    }
  },
  apis: ["./server/routes/*/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs
};
