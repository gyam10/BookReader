import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import icon from "../../assets/image/icon.png";
import { MdFavorite } from "react-icons/md";

export const MenuComponent = () => {
  const localUser = JSON.parse(localStorage.getItem("auth_user")) ?? null;

  let navigate = useNavigate();
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand className="nav-link me-5 ">
            <NavLink to="/">
              <img src={icon} alt="" height={"45px"} />
            </NavLink>
          </Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            {!localUser && (
              <>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </>
            )}
          </Nav>
          <Nav>
            <NavLink to={"/fav"} className="nav-link">
              FAV <MdFavorite />
            </NavLink>
            {localUser && (
              <>
                <NavLink className="nav-link" to={"/" + localUser.role[0]}>
                  {localUser.name.toUpperCase()}
                </NavLink>
                <NavLink
                  className="nav-link"
                  to="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("auth_user");
                    localStorage.removeItem("auth_token");
                    navigate("/login");
                  }}
                >
                  Logout
                </NavLink>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
