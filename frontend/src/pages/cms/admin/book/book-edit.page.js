import { toast } from "react-toastify";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { BookForm } from "./book.form.component";
import { getBookById, updateBook } from "../../../../services/book.service";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useState } from "react";

// const user_info = JSON.parse(localStorage.getItem("auth_user"));
const default_values = {
  title: "",
  author: "",
  category: "",
  image: "",
  // createdBy: user_info.name && user_info._id,
};

const BookEdit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(default_values);

  const handleSubmit = async (data) => {
    try {
      let response = await updateBook(data, params.id);

      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/book");
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const getBookDetail = useCallback(async () => {
    try {
      let id = params.id;
      let response = await getBookById(id);
      if (response.status) {
        setData(response.result);
      }
    } catch (error) {
      console.log("Data fetch:", error);
    }
  }, [params.id]);
  useEffect(() => {
    getBookDetail();
  }, [getBookDetail]);
  return (
    <>
      <div className="container-fluid px-4">
        <ToastContainer />
        <AdminBreadCrumb type="Book" opt={"Edit"} user="/admin" />
        <div className="card mb-4">
          <div className="card-body">
            <BookForm handleSubmit={handleSubmit} defaultData={data} />
          </div>
        </div>
      </div>
    </>
  );
};
export default BookEdit;
