import { Router } from "express";
import { ProductService } from "./product.service.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import isValidMongoId from "../middlewares/isValidMongoId.middleware.js";
import { productSchema } from "../validations/product.validation.js";

const productRouter = Router();

productRouter.get("/", ProductService.getAllProducts);
productRouter.get("/:id", isValidMongoId, ProductService.getProductById);
productRouter.post(
  "/",
  validateMiddleware(productSchema),
  ProductService.createProduct
);
productRouter.delete(
  "/:id",
  adminMiddleware,
  isValidMongoId,
  ProductService.deleteProduct
);
productRouter.patch(
  "/:id",
  adminMiddleware,
  isValidMongoId,
  validateMiddleware(productSchema),
  ProductService.updateProduct
);

export default productRouter;
