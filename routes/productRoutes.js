import express from "express";
import {
  addProduct,
  editProduct,
  getProductList,
  deleteProduct,
} from "../controllers/ProductController.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("default product request");
});

router.post("/add", addProduct);
router.post("/edit", editProduct);

router.get("/getAllProducts", getProductList);
router.post("/delete", deleteProduct);

export const productrouter = router;
