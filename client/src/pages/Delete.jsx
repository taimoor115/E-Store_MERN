import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteProduct } from "../store/features/admin.service";

const Delete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  //   const token = localStorage.getItem("token");

  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   };

  const handleDeleteProduct = async () => {
    dispatch(deleteProduct(id));
    navigate("/admin");
  };

  return (
    <div className="p-6 bg-base-100 flex justify-center items-center">
      <div className="container max-w-lg shadow-lg p-5">
        <Link
          to="/admin"
          className="flex justify-center items-center mb-4 w-12 py-2 px-4
                                          btn  text-sm rounded-xl"
        >
          Back
        </Link>
        <h2 className="text-2xl mb-4 font-semibold ">
          Are You Sure You Want to Delete This Product?
        </h2>
        <button
          onClick={handleDeleteProduct}
          className="bg-red-600 hover:bg-red-800 py-2 px-4 rounded-lg w-full"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  );
};

export default Delete;
