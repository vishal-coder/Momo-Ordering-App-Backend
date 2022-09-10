import express from "express";
import {
  createPaymnetOrder,
  payOrder,
} from "../controllers/PaymentController.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("default payment request");
});

router.post("/create-payment-order", createPaymnetOrder);
router.post("/pay-order", payOrder);

export const paymentrouter = router;
