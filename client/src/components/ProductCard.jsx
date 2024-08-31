import axios from "axios";
import ProductSingleCard from "./ProductSingleCard";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PigiTRtnNdEgCIIyxnW5adjPOi4OMjXAoOOjauPmKIWBdxi4iQfHk3F9lCcJYkJgTkxRibBGf0pcD8NLEQvudVJ00jgbrg3PJ"
);

const ProductCard = ({ product }) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/stripe/create-session-checkout",
        {
          products: [
            {
              name: "Car",
              price: 100,
              quantity: 1,
              image:
                "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            },
          ],
        }
      );

      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px] gap-6 mx-auto place-items-center">
      {Array.isArray(product) &&
        product.map((item) => (
          <ProductSingleCard key={item._id} product={item} />
        ))}
      <button onClick={handleCheckout}>Purchase it</button>
    </div>
  );
};

export default ProductCard;
