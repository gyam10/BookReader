import "../../assets/css/admin.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap";
import { Outlet } from "react-router-dom";
import AdminComponent from "../../component/cms";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReaderLayout = () => {
  return (
    <>
      <ToastContainer />
      <AdminComponent.TopNavComponent />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default ReaderLayout;
