import noImageFound from "../../../assets/image/no-image-found.jpg";
import { useState, useEffect } from "react";
import { getUserById } from "../../../services/user.service";
import { Container, Row, Col, Card } from "react-bootstrap";
import { MdFavorite } from "react-icons/md";
import { NavLink } from "react-router-dom";
const ReaderDashboard = () => {
  const localUser = JSON.parse(localStorage.getItem("auth_user"));
  const handelError = (e) => {
    e.target.src = noImageFound;
  };
  let [data, setData] = useState();

  const getUser = async () => {
    try {
      if (localUser.role[0] === "reader") {
        let response = await getUserById(localUser._id);
        console.log(response.result);
        if (response.result) {
          setData(response.result);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Container className="mt-5">
        {data && (
          <>
            <Row>
              <Col>
                <div className="text-center">
                  <Card.Img
                    variant="center"
                    src={
                      process.env.REACT_APP_IMAGE_URL + "/user/" + data.image
                    }
                    onError={handelError}
                    className="thumb-small"
                  />
                </div>
              </Col>
            </Row>
            <Col>
              <Row>
                <Col>
                  <h4 className="text-center mt-3">
                    User: {data.name.toUpperCase()}
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6 className="text-center mt-3">Email: {data.email}</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <NavLink className="nav-link text-center" to={"/fav"}>
                    <h5>
                      FAV <MdFavorite />
                    </h5>
                  </NavLink>
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Container>
    </>
  );
};
export default ReaderDashboard;
