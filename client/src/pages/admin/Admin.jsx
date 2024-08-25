import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { getAllProducts } from "../../store/features/admin.service";

const Admin = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const { products, status, error } = useSelector((state) => state.products);
  const { data: product } = products;

  useEffect(() => {
    dispatch(getAllProducts({ pageNo: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  if (status === "error") return <p>Error: {error}</p>;

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                <Link
                  to="/admin/product/create"
                  className="px-4 py-2 font-medium bg-green-600 rounded-lg shadow-md hover:bg-green-900 text-base-100"
                >
                  Add Item +
                </Link>
              </th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>

          {status == "loading" ? (
            <Spinner />
          ) : (
            <tbody>
              {product?.products?.map((product) => (
                <tr key={product._id} className="bg-base-100 hover:bg-base-300">
                  <td>
                    <div className="avatar">
                      <div className="w-12 h-12 mask mask-squircle">
                        <img src={product.image} alt={product.name} />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">{product.name}</td>
                  <td className="px-5 py-3">{product.price}</td>
                  <td className="px-5 py-3">{product.category}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-center gap-x-1">
                      <Link
                        to={`/admin/product/edit/${product._id}`}
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-l-lg hover:bg-orange-900"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/admin/product/delete/${product._id}`}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-r-lg hover:bg-red-900"
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={product?.totalPage || 0}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="pagination-container"
          pageLinkClassName="pagination-item"
          previousLinkClassName="arrow-label"
          nextLinkClassName="arrow-label"
          breakLinkClassName="pagination-item"
          activeClassName="active"
          forcePage={currentPage}
        />
      </div>
    </div>
  );
};

export default Admin;
