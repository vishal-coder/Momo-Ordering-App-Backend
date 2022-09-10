import express from "express";
import { saveOrder } from "../controllers/OrderController.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("default Order request");
});

router.post("/save", saveOrder);

export const orderrouter = router;
