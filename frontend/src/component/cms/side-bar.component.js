import { NavLink } from "react-router-dom";

const SideBarComponent = () => {
  const localUser = JSON.parse(localStorage.getItem("auth_user")) ?? null;

  return (
    <>
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Core</div>
              <NavLink className="nav-link" to="/admin">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt" />
                </div>
                Dashboard
              </NavLink>
              <NavLink className="nav-link" to="/admin/book">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-book" />
                </div>
                Book
              </NavLink>

              <NavLink className="nav-link" to="/admin/user">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-user" />
                </div>
                User
              </NavLink>
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            {localUser.name.toUpperCase()}
          </div>
        </nav>
      </div>
    </>
  );
};
export default SideBarComponent;
