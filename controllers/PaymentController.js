import Razorpay from "razorpay";
import { savePaymentDetails } from "../models/PaymentModal.js";
export const createPaymnetOrder = async (req, res) => {
  console.log("Inside createPaymnetOrder");
  const { amount } = req.body;
  let order = null;
  console.log(process.env.RZ_KEY_ID);

  var instance = new Razorpay({
    key_id: process.env.RZ_KEY_ID,
    key_secret: process.env.RZ_KEY_SECRET,
  });

  var options = {
    amount: 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  await instance.orders.create(options, function (err, order) {
    if (err) {
      return res
        .status(500)
        .send({ success: false, message: "some error occured" });
    } else {
      res.send({
        success: true,
        message: "payment initiated successfully",
        orderDate: order,
      });
    }
    console.log(order);
  });
};

export const payOrder = async (req, res) => {
  console.log("Inside payOrder");
  const { amount, razorpayPaymentId, razorPayOrderId, razorpaySignature } =
    req.body;

  const query = {
    isPaid: true,
    amount: amount,
    razorPay: {
      orderId: razorPayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    },
  };

  const payment = savePaymentDetails(query);

  console.log("payment", payment);
  if (!payment) {
    return res
      .status(500)
      .send({ success: false, message: "some error occured" });
  }

  res.send({ success: true, message: "Payment was successful" });
};
