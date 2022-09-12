import { client, io } from "../index.js";
import { closeChangeStream } from "./EventMonitor.js";

export async function monitorOrdersUsingEventEmitter(
  client,
  timeInMs = 10000,
  emmiterName,
  pipeline = []
) {
  const collection = client.db("momoking").collection("orders");
  const changeStream = collection.watch(pipeline);
  changeStream.on("change", (next) => {
    console.log("products next change is ", next);
    io.emit(emmiterName, next);
  });
  // Wait the given amount of time and then close the change stream
  await closeChangeStream(timeInMs, changeStream); //
}
