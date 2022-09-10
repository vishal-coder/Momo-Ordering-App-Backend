import { client } from "../index.js";
import { ObjectId } from "mongodb";

export function savePaymentDetails(data) {
  return client.db("momoking").collection("payments").insertOne(data);
}
