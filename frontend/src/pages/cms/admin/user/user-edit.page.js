import { toast } from "react-toastify";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { UserForm } from "./user.form.component";
import { getUserById, updateUser } from "../../../../services/user.service";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useState } from "react";

// const user_info = JSON.parse(localStorage.getItem("auth_user"));
const default_values = {
  name: "",
  email: "",
  password: "",
  role: [],
  image: "",
};

const UserEdit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(default_values);

  const handleSubmit = async (data) => {
    try {
      // console.log("test", data);

      let response = await updateUser(data, params.id);
      console.log("users:", response);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/user");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const getUserDetail = useCallback(async () => {
    try {
      let id = params.id;
      let response = await getUserById(id);
      if (response.status) {
        setData(response.result);
      }
    } catch (error) {
      console.log("Data fetch:", error);
    }
  }, [params.id]);
  useEffect(() => {
    getUserDetail();
  }, [getUserDetail]);
  return (
    <>
      <div className="container-fluid px-4">
        <ToastContainer />
        <AdminBreadCrumb type="User" opt={"Edit"} />
        <div className="card mb-4">
          <div className="card-body">
            <UserForm
              handleSubmit={handleSubmit}
              defaultData={data}
              edit={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default UserEdit;
