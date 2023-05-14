import { NavLink, useNavigate } from "react-router-dom";

export const TopNavComponent = () => {
  const localUser = JSON.parse(localStorage.getItem("auth_user")) ?? null;
  const toggleSlideBar = (e) => {
    e.preventDefault();
    document.body.classList.toggle("sb-sidenav-toggled");
    localStorage.setItem(
      "sb|sidebar-toggle",
      document.body.classList.contains("sb-sidenav-toggled")
    );
  };
  let navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        {/* Navbar Brand*/}
        <NavLink className="navbar-brand ps-3" to={"/" + localUser.role[0]}>
          {localUser.role[0].toUpperCase()} PANEL
        </NavLink>
        {localUser.role[0] === "admin" ?? (
          <>
            {/* Sidebar Toggle*/}
            <button
              onClick={toggleSlideBar}
              className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
              id="sidebarToggle"
              href="/"
            >
              <i className="fas fa-bars" />
            </button>
          </>
        )}

        {/* Navbar Search*/}
        <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></div>
        {/* Navbar*/}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="/"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw" />
              {localUser.name.toUpperCase()}
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              {/* <li>
                <a className="dropdown-item" href="/">
                  Edit Profile
                </a>
              </li> */}

              <li>
                <NavLink className="dropdown-item" to="/login" onClick={logout}>
                  Logout
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};
