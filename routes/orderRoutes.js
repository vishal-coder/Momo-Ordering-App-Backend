import express from "express";
import {
  saveOrder,
  getAllOrders,
  updateOrder,
} from "../controllers/OrderController.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("default Order request");
});

router.post("/save", saveOrder);
router.get("/getAll", getAllOrders);
router.post("/update", updateOrder);

export const orderrouter = router;
