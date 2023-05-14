import { NavLink } from "react-router-dom";

export const AdminBreadCrumb = ({ createUrl, type, opt, user }) => {
  return (
    <>
      <h1 className="mt-4">
        {type} {opt}
        {createUrl && (
          <NavLink to={createUrl} className="btn btn-sm btn-success float-end">
            <i className="fas fa-plus"></i>Add {type}
          </NavLink>
        )}
      </h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <NavLink to={user}>Dashboard</NavLink>
        </li>
        <li className="breadcrumb-item active">
          {type} {opt}
        </li>
      </ol>
    </>
  );
};
