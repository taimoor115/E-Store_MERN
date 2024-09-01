import express from "express";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import productsRouter from "./routes/product.route.js";
import stripeRoute from "./routes/stripe.route.js";
import cookieParser from "cookie-parser";
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
app.use(cookieParser());
app.use("/api/products", productsRouter);
app.use("/api/users", userRoute);
app.use("/api/stripe", stripeRoute);

export default app;
