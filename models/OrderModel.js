import { client } from "../index.js";
import { ObjectId } from "mongodb";

export function insertOrder(data) {
  return client.db("momoking").collection("orders").insertOne(data);
}
