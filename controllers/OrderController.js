import { insertOrder } from "../models/OrderModel.js";

export const saveOrder = async (req, res) => {
  console.log("Inside saveOrder");
  const { cart, user, total } = req.body;

  const added = await insertOrder({
    user: user,
    cart: cart,
    total: total,
    createdOn: new Date(),
  });
  if (!added) {
    res.send({
      success: false,
      message: "Failed to add product",
    });
    res.end();
  }
  res.send({
    success: true,
    message: "product added successfully",
    product: added,
  });
};
