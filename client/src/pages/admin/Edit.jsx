import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { editProduct, getSingleUser } from "../../store/features/admin.service";
import Spinner from "../../components/Spinner";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  category: Yup.string().required("Category is required"),
});

const Edit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectedProduct, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, [dispatch, id]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("category", values.category);
      if (values.image) {
        formData.append("image", values.image);
      }

      await dispatch(editProduct({ id, data: formData }));
      toast.success("Product updated successfully!");

      resetForm();
      navigate("/admin");
    } catch (err) {
      toast.error(`Failed to update product: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading") return <Spinner />;

  if (!selectedProduct) return <p>No product found</p>;

  return (
    <Formik
      initialValues={{
        name: selectedProduct.name || "",
        price: selectedProduct.price || "",
        image: null,
        category: selectedProduct.category || "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ setFieldValue, values, isSubmitting }) => (
        <Form
          encType="multipart/form-data"
          className="flex items-center justify-center gap-3 p-3 mt-3 text-white form-control"
        >
          <div className="space-y-4 lg:w-[800px] md:w-[800px]">
            <div className="mb-8 text-5xl font-bold text-center md:text-4xl lg:text-4xl">
              Edit Product
            </div>

            <div>
              <label className="flex items-center gap-2 input input-success">
                <Field
                  type="text"
                  name="name"
                  className="grow"
                  placeholder="Name"
                  value={values.name}
                />
              </label>
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>

            <div>
              <Field
                type="number"
                name="price"
                className="w-full input input-success"
                placeholder="Price"
                value={values.price}
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500"
              />
            </div>

            <div>
              <input
                type="file"
                accept="image/*"
                className="w-full file-input file-input-bordered file-input-success"
                onChange={(e) =>
                  setFieldValue("image", e.currentTarget.files[0])
                }
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500"
              />
            </div>

            <div>
              <Field
                as="select"
                name="category"
                className="w-full select select-success"
                value={values.category}
              >
                <option value="">Select a category</option>
                <option value="template">Template</option>
                <option value="course">Course</option>
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-success btn-wide"
              >
                {isSubmitting ? "Updating..." : "Update Product"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Edit;
