import { client } from "../index.js";
import { ObjectId } from "mongodb";

export function addProductToDB(data) {
  return client.db("momoking").collection("products").insertOne(data);
}

export function editProductFromDB(_id, title, description, price) {
  return client
    .db("momoking")
    .collection("products")
    .updateOne(
      { _id: ObjectId(_id) },
      { $set: { title: title, description: description, price: price } }
    );
}

export function getProductsFromDB() {
  return client.db("momoking").collection("products").find().toArray();
}

export function deleteProductFromDB(data) {
  return client.db("momoking").collection("products").deleteOne(data);
}
