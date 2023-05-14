import { toast } from "react-toastify";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { UserForm } from "./user.form.component";
import { createUser } from "../../../../services/user.service";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const user_info = JSON.parse(localStorage.getItem("auth_user"));
const default_values = {
  name: "",
  email: "",
  password: "",
  role: [],
  image: "",
};
const UserAdd = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    try {
      let response = await createUser(data);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/user");
      } else {
        toast.error(response.msg);
      }
      // console.log("Data:", data);
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };
  return (
    <>
      <div className="container-fluid px-4">
        <ToastContainer />
        <AdminBreadCrumb type="User" opt={"Create"} />
        <div className="card mb-4">
          <div className="card-body">
            <UserForm
              handleSubmit={handleSubmit}
              defaultData={default_values}
              edit={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default UserAdd;
