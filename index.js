import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.js";
import { ChangeStream, MongoClient } from "mongodb";
import cors from "cors";
import { productrouter } from "./routes/productRoutes.js";
import { orderrouter } from "./routes/orderRoutes.js";
import { paymentrouter } from "./routes/paymentRoutes.js";
import { Server } from "socket.io";
import http from "http";

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
const app = express();
dotenv.config();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const activeUsers = new Set();

app.use(cors(corsOptions));
app.use(express.json());

export const io = new Server(server, {
  cors: {
    origin: `${process.env.CLIENT_URL}`,
    methods: ["GET", "POST"],
  },
});

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

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("new user", function (data) {
    socket.userId = data;
    activeUsers.add(data);
    console.log("nwe user lis", activeUsers);
  });

  socket.on("disconnect", () => {
    activeUsers.delete(socket.userId);
    io.emit("user disconnected", socket.userId);
  });
});

server.listen(PORT, () => {
  console.log("listening on *:", PORT);
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
