// import { useDispatch } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import CardLayout from "../../component/common/card.component";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { postRequest } from "../../services/axios.service";
const FavPage = () => {
  const [book, setBook] = useState();

  const current_fav = useSelector((store) => {
    return store.fav.favDetail;
  });

  const getFavDetail = useCallback(async () => {
    let response = await postRequest("/fav/detail", current_fav);
    if (response.status) {
      setBook(response.result);
      console.log("test", response);
    }
  }, []);
  useEffect(() => {
    getFavDetail();
  }, [getFavDetail]);
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col sm={12}>
            <h4 className="text-center">Favourite Page</h4>
            <hr />
            <Row className="mt-3">
              {book &&
                book.map((item, index) => (
                  <Col sm={6} md={2} key={index}>
                    <CardLayout data={item} type="books" />
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FavPage;
