import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.js";
import { MongoClient } from "mongodb";
import cors from "cors";
import { productrouter } from "./routes/productRoutes.js";
import { orderrouter } from "./routes/orderRoutes.js";
import { paymentrouter } from "./routes/paymentRoutes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
async function createConnection() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("connected to database");
    return client;
  } catch (error) {
    console.log("error while connecting to database", error);
  }
}

app.listen(PORT, () => {
  console.log("listening at", PORT);
});

app.get("/", (req, res) => {
  //   console.log("default request");
  res.send({ message: "default request" });
});

export const client = await createConnection();
app.use("/auth", authRouter);
app.use("/product", productrouter);
app.use("/order", orderrouter);
app.use("/payment", paymentrouter);
