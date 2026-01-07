import type { Request, Response } from "express";
import productModel from "./product.model.js";

async function getAllProducts(req: Request, res: Response) {
  const products = await productModel.find();
  res.json(products);
}

async function createProduct(req: Request, res: Response) {
  const { name, description, price, photo, category } = req.body;
  const newProduct = await productModel.create({
    name,
    description,
    price,
    photo,
    category,
  });
  res.status(201).json(newProduct);
}

async function getProductById(req: Request, res: Response) {
  const id = req.params.id;
  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }

  res.json(product);
}

async function deleteProduct(req: Request, res: Response) {
  const id = req.params.id;

  const deletedProduct = await productModel.findByIdAndDelete(id);
  if (!deletedProduct) {
    return res.status(404).json({ message: "product not found" });
  }

  res.json(deletedProduct);
}

async function updateProduct(req: Request, res: Response) {
  const id = req.params.id;
  const { name, description, price, photo, category } = req.body;

  const updatedProduct = await productModel.findByIdAndUpdate(
    id,
    { name, description, price, photo, category },
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(404).json({ message: "product not found" });
  }

  res.json(updatedProduct);
}

export const ProductService = {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
};
