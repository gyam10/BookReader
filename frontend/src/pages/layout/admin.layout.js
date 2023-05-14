import "../../assets/css/admin.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap";
import { Outlet } from "react-router-dom";
import AdminComponent from "../../component/cms";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLayout = () => {
  return (
    <>
      <ToastContainer />
      <AdminComponent.TopNavComponent />
      <div id="layoutSidenav">
        <AdminComponent.SideBarComponent />
        <div id="layoutSidenav_content">
          <main>
            <Outlet />
          </main>
          <AdminComponent.FooterComponent />
        </div>
      </div>
    </>
  );
};
export default AdminLayout;
