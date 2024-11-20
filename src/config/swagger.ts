import swaggerJSDoc from "swagger-jsdoc";
const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.1.0",
    tags: [
      {
        name: "Products",
        description: "API opereations database about products",
      },
    ],
    info: {
      title: "REST API with Nodejs/expressjs and Typescript",
      version: "0.0.1",
      description: "API docs for products",
    },
  },
  apis: ["./src/routes/*"],
};

const swaggerSpecs = swaggerJSDoc(options);
export default swaggerSpecs;
