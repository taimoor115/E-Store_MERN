import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/features/admin.service";
import Spinner from "../../components/Spinner";
import ProductCard from "../../components/ProductCard";
const Home = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state?.products);

  console.log(products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (status === "loading") return <Spinner />;
  if (error) return <h2>error</h2>;

  // const latestProducts = products?.slice(0, 3);

  // console.log(latestProducts);

  return (
    <div className="p-4 max-w-[1300px] mx-auto my-16">
      <div className="mb-24 text-center hero-content">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Welcome to <span className="text-teal-700">E-Store</span>
          </h1>
          <p className="py-6">
            We offer the high quality online courses for programming and website
            templates you can buy.
          </p>
          <a href="/shop" className="mt-4 btn btn-accent">
            Shop
          </a>
        </div>
      </div>

      <ProductCard product={products} />
    </div>
  );
};

export default Home;
