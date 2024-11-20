import { Request, Response } from "express";
import Products from "../models/Products.modelo";
export const createProducto = async (req: Request, res: Response) => {
  try {
    const crearProducto = await Products.create(req.body);
    res.status(201).json({ data: crearProducto });
  } catch (error) {
    console.log(error);

    res.status(400).json({ msg: "Se produjo un error" });
  }
};
export const getProductos = async (req: Request, res: Response) => {
  try {
    const productos = await Products.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json({ data: productos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Se produjo un error" });
  }
};
export const getProductoId = async (req: Request, res: Response) => {
  try {
    const producto = await Products.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!producto) {
      res.status(404).json({
        data: {
          msg: "Producto no encontrado",
        },
      });
      return;
    }
    res.json({ data: producto });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Se produjo un error" });
  }
};
export const putProductoId = async (req: Request, res: Response) => {
  try {
    const producto = await Products.findOne({
      where: { id: req.params.id },
    });
    if (!producto) {
      res.status(404).json({
        data: {
          msg: "Producto no encontrado",
        },
      });
      return;
    }
    await producto.update(req.body);
    await producto.save();
    res.json({
      data: {
        msg: "Producto actualizado",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Se produjo un error" });
  }
};
export const patchProductoId = async (req: Request, res: Response) => {
  try {
    const producto = await Products.findOne({
      where: { id: req.params.id },
    });
    if (!producto) {
      res.status(404).json({
        data: {
          msg: "Producto no encontrado",
        },
      });
      return;
    }
    producto.availabity = !producto.dataValues.availabity;
    await producto.save();
    res.json({
      data: {
        msg: "Producto actualizado",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Se produjo un error" });
  }
};
export const deleteProductoId = async (req: Request, res: Response) => {
  try {
    const producto = await Products.findOne({
      where: { id: req.params.id },
    });
    if (!producto) {
      res.status(404).json({
        data: {
          msg: "Producto no encontrado",
        },
      });
      return;
    }
    await producto.destroy();
    res.json({
      data: {
        msg: "Producto eliminado",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Se produjo un error" });
  }
};
