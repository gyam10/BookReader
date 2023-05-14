import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { toast } from "react-toastify";
import { deleteUserById, getAllUsers } from "../../../../services/user.service";
import ActionButtons from "../../../../component/common/action.btn.component";

const UserPage = () => {
  const deleteUser = async (id) => {
    // console.log("delete", id);
    try {
      let response = await deleteUserById(id);
      if (response.status) {
        toast.success(response.msg);
        getAllUser();
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.log("Delete:", error);
    }
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role.join(", "),
    },
    {
      name: "Image",
      selector: (row) => row.image,
    },
    {
      name: "Action",
      selector: (row) => (
        <ActionButtons
          id={row._id}
          onDeleteClick={deleteUser}
          updatePath={`/admin/user/` + row._id}
        />
      ),
    },
  ];

  const [data, setData] = useState();
  const getAllUser = async () => {
    try {
      let result = await getAllUsers();
      if (result.status) {
        let logged_in = JSON.parse(localStorage.getItem("auth_user"));
        let allUsers = result.result.filter(
          (item) => item._id !== logged_in._id
        );
        setData(allUsers);
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb
          createUrl={"/admin/user/create"}
          type="User"
          opt={"Listing"}
        />

        <Row>
          <Col sm={12}>
            <DataTable columns={columns} data={data} pagination />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default UserPage;
