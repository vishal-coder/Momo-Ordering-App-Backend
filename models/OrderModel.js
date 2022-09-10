import { client } from "../index.js";
import { ObjectId } from "mongodb";

export function insertOrder(data) {
  return client.db("momoking").collection("orders").insertOne(data);
}

export function getOrdersFromDB() {
  return (
    client
      .db("momoking")
      .collection("orders")
      // .aggregate([{ $unwind: "$cart" }])
      .find()
      .toArray()
  );
}

export function updateOrderStatus(_id, status) {
  return client
    .db("momoking")
    .collection("orders")
    .updateOne({ _id: ObjectId(_id) }, { $set: { status: status } });
}
