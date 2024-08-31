import { Stripe } from "stripe";
import express from "express";
import { config } from "dotenv";

config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

router.use((req, res, next) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return res
      .status(500)
      .json({ message: "Stripe secret key is not configured." });
  }
  next();
});

router.post("/create-session-checkout", async (req, res) => {
  const { products } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Invalid products data." });
  }

  try {
    const lineItems = products.map((product) => {
      if (
        !product.name ||
        !product.image ||
        !product.price ||
        !product.quantity
      ) {
        throw new Error("Missing product information.");
      }
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      billing_address_collection: "required",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Failed to create checkout session:", error);
    res.status(500).json({ message: "Error occurred while creating session." });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const balance = await stripe.balance.retrieve();

    console.log("Balance Object:", JSON.stringify(balance, null, 2));

    const availableBalanceUSD = balance.available.find(
      (b) => b.currency === "usd"
    );
    const pendingBalanceUSD = balance.pending.find((b) => b.currency === "usd");

    const availableBalance = availableBalanceUSD
      ? availableBalanceUSD.amount / 100
      : 0;
    const pendingBalance = pendingBalanceUSD
      ? pendingBalanceUSD.amount / 100
      : 0;

    const charges = await stripe.charges.list({ limit: 100 });

    const totalCharges = charges.data.length;

    res.json({
      availableBalance,
      pendingBalance,
      totalCharges,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  console.log("🚀 ~ router.get ~ null:", null);
  console.log("🚀 ~ router.get ~ null:", null);
});

export default router;
