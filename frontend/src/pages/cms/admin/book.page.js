import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { AdminBreadCrumb } from "../../../component/cms/breadcrumb.component";
import { toast } from "react-toastify";
import { deleteBookById, getAllBooks } from "../../../services/book.service";
import ActionButtons from "../../../component/common/action.btn.component";

const BookPage = () => {
  const deleteBook = async (id) => {
    // console.log("delete", id);
    try {
      let response = await deleteBookById(id);
      if (response.status) {
        toast.success(response.msg);
        getAllBook();
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.log("Delete:", error);
    }
  };
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Author",
      selector: (row) => row.author,
    },

    {
      name: "Action",
      selector: (row) => (
        <ActionButtons
          id={row._id}
          onDeleteClick={deleteBook}
          updatePath={`/admin/book/` + row._id}
        />
      ),
    },
  ];

  const [data, setData] = useState();
  const getAllBook = async () => {
    try {
      // console.log("here");
      let result = await getAllBooks();

      if (result.status) {
        setData(result.result);
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getAllBook();
  }, []);

  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb
          createUrl={"/admin/book/create"}
          type="Book"
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
export default BookPage;
