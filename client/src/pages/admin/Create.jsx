import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createProduct } from "../../store/features/admin.service";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  image: Yup.mixed().required("Image is required"),
  category: Yup.string().required("Category is required"),
});

const CreateBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);

      // Prepare FormData for image upload
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("image", values.image);

      await dispatch(createProduct(formData));

      resetForm();
      navigate("/admin");
    } catch (err) {
      toast.error(`Failed to create blog: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        price: "",
        image: null,
        category: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="flex items-center justify-center gap-3 p-3 mt-3 text-white form-control">
          <div className="space-y-4 lg:w-[800px] md:w-[800px]">
            <div className="mb-8 text-5xl font-bold text-center md:text-4xl lg:text-4xl">
              Create Blog
            </div>

            <div>
              <label className="flex items-center gap-2 input input-success">
                <Field
                  type="text"
                  name="name"
                  className="grow"
                  placeholder="Name"
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
                className="w-full input input-success "
                placeholder="Price"
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
                className="w-full file-input file-input-bordered file-input-success "
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
                className="w-full select select-success "
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
                {isSubmitting ? "Creating..." : "Create Blog"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateBlog;
