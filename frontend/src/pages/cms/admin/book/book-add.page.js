import { toast } from "react-toastify";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { BookForm } from "./book.form.component";
import { createBook } from "../../../../services/book.service";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const user_info = JSON.parse(localStorage.getItem("auth_user"));
const default_values = {
  title: "",
  author: "",
  category: "",
  image: "",
  // createdBy: user_info.name && user_info._id,
};
const BookAdd = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    try {
      let response = await createBook(data);
      toast.success(response.msg);
      navigate("/admin/book");
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };
  return (
    <>
      <div className="container-fluid px-4">
        <ToastContainer />
        <AdminBreadCrumb type="Book" opt={"Create"} user="/admin" />
        <div className="card mb-4">
          <div className="card-body">
            <BookForm
              handleSubmit={handleSubmit}
              defaultData={default_values}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default BookAdd;
