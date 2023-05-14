import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
const ActionButtons = ({ id, onDeleteClick, updatePath }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteClick(id);
      }
    });
  };
  return (
    <>
      {updatePath && (
        <NavLink
          to={updatePath}
          className="btn btn-sm btn-success rounded-circle me-2"
        >
          <i className="fa fa-pen" />
        </NavLink>
      )}
      {onDeleteClick && (
        <NavLink
          to="/delete"
          onClick={handleDelete}
          className="btn btn-sm btn-danger rounded-circle"
        >
          <i className="fa fa-trash" />
        </NavLink>
      )}
    </>
  );
};
export default ActionButtons;
