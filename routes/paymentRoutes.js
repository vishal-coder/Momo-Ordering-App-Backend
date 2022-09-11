import express from "express";
import {
  createPaymnetOrder,
  savePaymentInfo,
} from "../controllers/PaymentController.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("default payment request");
});

router.post("/create-payment-order", createPaymnetOrder);
router.post("/savePaymentInfo", savePaymentInfo);

export const paymentrouter = router;
