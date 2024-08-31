import express from "express";
import cors from "cors";
import productsRouter from "./routes/product.route.js";
import stripeRoute from "./routes/stripe.route.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/products", productsRouter);
app.use("/api/stripe", stripeRoute);

export default app;
