import Router from "express";
import {
  createProducto,
  deleteProductoId,
  getProductoId,
  getProductos,
  patchProductoId,
  putProductoId,
} from "../handlers/products";
import { body, param } from "express-validator";
import { handleErrorsInputs } from "../middleware";
const products = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *           type: integer
 *           description: The product id
 *           example: 1
 *        name:
 *           type: string
 *           description: Name of product
 *           example: Mouse Gamer
 *        price:
 *           type: number
 *           description: Price of the product
 *           example: 2000
 *        units:
 *           type: number
 *           description: Units of the product
 *           example: 10
 *        availabity:
 *           type: boolean
 *           description: State about availabity of the product
 *           example: true
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get list of products 
 *          tags:
 *              - Products
 *          description: Return list of products
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                             schema:
 *                                    type: array
 *                                    items:
 *                                      $ref: "#/components/schemas/Product"
 * 


 */
products.get("/", getProductos);
/**
 * @swagger
 *   /api/products:
 *   post:
 *     summary: Create a product
 *     tags:
 *       - Products
 *     description: Return a new record in the database
 *     requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                        schema:
 *                           type: object
 *                           properties:
 *                                name:
 *                                  type: string
 *                                  example: "Mouse ergónomico"
 *                                price:
 *                                  type: number
 *                                  example: 20
 *                                units:
 *                                  type: number
 *                                  example: 2
 *     responses:
 *              201:
 *                 description: Product create successfully
 *              400:
 *                 description: Bad Request - invalid input data
 *
 */
products.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede estar vacio"),
  body("price")
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .notEmpty()
    .withMessage("El precio no puede estar vacio")
    .custom((valor) => valor > 0)
    .withMessage("El precio debe ser mayor a cero"),
  body("units")
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .notEmpty()
    .withMessage("El precio no puede estar vacio")
    .custom((valor) => valor >= 0)
    .withMessage("El precio debe ser mayor o igual a cero"),
  handleErrorsInputs,
  createProducto
);
/**
 * @swagger
 *   /api/products/{id}:
 *   get:
 *     summary: Get a product by id
 *     tags:
 *       - Products
 *     description: Return a product based on id
 *     parameters:
 *      - in: path
 *        name: id
 *        description: The ID of product to get
 *        required: true
 *        schema:
 *           type: integer
 *     responses:
 *              200:
 *                 description: Successful Response
 *                 content:
 *                  application/json:
 *                    schema:
 *                      $ref: "#/components/schemas/Product"
 *              400:
 *                 description: Bad Request - ID
 *              404:
 *                 description: Not found
 *
 *
 */
products.get(
  "/:id",
  param("id").isInt().withMessage("Id inválido"),
  handleErrorsInputs,
  getProductoId
);
/**
 * @swagger
 *   /api/products/{id}:
 *   put:
 *     summary: Update a product with data of user
 *     tags:
 *       - Products
 *     description: Return the product updated
 *     parameters:
 *      - in: path
 *        name: id
 *        description: The ID of product to get
 *        required: true
 *        schema:
 *           type: integer
 *     requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                        schema:
 *                           type: object
 *                           properties:
 *                                name:
 *                                  type: string
 *                                  example: "Mouse ergónomico"
 *                                price:
 *                                  type: number
 *                                  example: 20
 *                                units:
 *                                  type: number
 *                                  example: 2
 *                                availabity:
 *                                  type: boolean
 *                                  example: false
 *     responses:
 *              200:
 *                 description: Successfully response
 *                 content:
 *                  application/json:
 *                    schema:
 *                      $ref: "#/components/schemas/Product"
 *              400:
 *                 description: Bad Request - invalid Id or input data
 *              404:
 *                 description: Product Not Found
 *
 */
products.put(
  "/:id",
  param("id").isInt().withMessage("Id inválido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede estar vacio"),
  body("price")
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .notEmpty()
    .withMessage("El precio no puede estar vacio")
    .custom((valor) => valor > 0)
    .withMessage("El precio debe ser mayor a cero"),
  body("units")
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .notEmpty()
    .withMessage("El precio no puede estar vacio")
    .custom((valor) => valor >= 0)
    .withMessage("El precio debe ser mayor o igual a cero"),
  body("availabity").isBoolean().withMessage("Valor no valido de availabity"),
  handleErrorsInputs,
  putProductoId
);
/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update availabity
 *     tags:
 *       - Products
 *     description: Return the product updated
 *     parameters:
 *      - in: path
 *        name: id
 *        description: The ID of product to get
 *        required: true
 *        schema:
 *           type: integer
 *     responses:
 *              200:
 *                 description: Successfully response
 *                 content:
 *                  application/json:
 *                    schema:
 *                      $ref: "#/components/schemas/Product"
 *              400:
 *                 description: Bad Request - invalid Id or input data
 *              404:
 *                 description: Product Not Found
 *
 */
products.patch(
  "/:id",
  param("id").isInt().withMessage("Id inválido"),
  handleErrorsInputs,
  patchProductoId
);
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delet a product by id
 *     tags:
 *       - Products
 *     description: Return a sring with message successfully
 *     parameters:
 *      - in: path
 *        name: id
 *        description: The ID of product to get
 *        required: true
 *        schema:
 *           type: integer
 *     responses:
 *              200:
 *                 description: Successfully response
 *                 content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        data:
 *                          type: object
 *                          properties:
 *                            msg:
 *                              type: string
 *                              example: "Producto eliminado"
 *              400:
 *                 description: Bad Request - invalid Id or input data
 *              404:
 *                 description: Product Not Found
 *
 */

products.delete(
  "/:id",
  param("id").isInt().withMessage("Id inválido"),
  handleErrorsInputs,
  deleteProductoId
);
export default products;
