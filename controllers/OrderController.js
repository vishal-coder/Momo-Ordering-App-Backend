import {
  getOrdersFromDB,
  insertOrder,
  updateOrderStatus,
} from "../models/OrderModel.js";

export const saveOrder = async (req, res) => {
  console.log("Inside saveOrder");
  const { cart, user, total } = req.body;

  const added = await insertOrder({
    user: user,
    cart: cart,
    total: total,
    status: 0,
    createdOn: new Date(),
  });
  if (!added) {
    res.send({
      success: false,
      message: "Failed to add order",
    });
    res.end();
  }
  res.send({
    success: true,
    message: "order added successfully",
    product: added,
  });
};

export const getAllOrders = async (req, res) => {
  console.log("Inside getAllOrders");

  const orderlist = await getOrdersFromDB();
  if (!orderlist) {
    res.send({
      success: false,
      message: "Failed to get orders",
    });
    res.end();
  }
  res.send({
    success: true,
    message: "fetched orders successfully",
    orderlist: orderlist,
  });
};

export const updateOrder = async (req, res) => {
  console.log("Inside updateOrder");
  const { id, status } = req.body;
  console.log("Inside updateOrder", id, status);

  const updatedOrder = await updateOrderStatus(id, status);
  if (!updatedOrder) {
    res.send({
      success: false,
      message: "Failed to get orders",
    });
    res.end();
  }
  res.send({
    success: true,
    message: "fetched orders successfully",
  });
};
