import express from "express";
import {
  saveOrder,
  getAllOrders,
  updateOrder,
  getCustomerOrder,
} from "../controllers/OrderController.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("default Order request");
});

router.post("/save", saveOrder);
router.get("/getAll", getAllOrders);
router.post("/update", updateOrder);
router.post("/getCustomerOrder", getCustomerOrder);

export const orderrouter = router;
