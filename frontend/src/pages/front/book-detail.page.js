import { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import noImageFound from "../../assets/image/no-image-found.jpg";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaHeartBroken } from "react-icons/fa";
import { getBookBySlug } from "../../services/book.service";
import { useDispatch } from "react-redux";
import { addBookToFav, removeBookFromFav } from "../../reducer/fav.reducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BookDetailPage = () => {
  const handelError = (e) => {
    e.target.src = noImageFound;
  };
  let [data, setData] = useState();
  let dispatch = useDispatch();
  const params = useParams();

  const getBook = async () => {
    try {
      let response = await getBookBySlug(params.slug);
      console.log(response.result);
      if (response.result) {
        setData(response.result);
      }
    } catch (error) {}
  };

  const addCurrentBookToFav = (e) => {
    e.preventDefault();
    dispatch(addBookToFav({ book_id: data._id }));
  };
  const removeCurrentBookFromFav = () => {
    dispatch(removeBookFromFav({ book_id: data._id }));
  };

  useEffect(() => {
    getBook();
  }, [params]);
  return (
    <>
      <Container className="mt-5">
        <ToastContainer />
        {data && (
          <>
            <Row>
              <Col>
                <div className="text-center">
                  <Card.Img
                    variant="center"
                    src={
                      process.env.REACT_APP_IMAGE_URL + "/books/" + data.image
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
                  <h2 className="text-center">{data.title.toUpperCase()}</h2>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  <h4 className="text-center">{data.author.toUpperCase()}</h4>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col className="text-center">
                  <Badge pill bg="info">
                    {data.category.toUpperCase()}
                  </Badge>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <Button
                    variant="warning"
                    type="button"
                    size="md"
                    className="mt-3 me-2"
                    onClick={addCurrentBookToFav}
                  >
                    FAV <MdOutlineFavoriteBorder />
                  </Button>
                  <Button
                    variant="danger"
                    size="md"
                    className="mt-3"
                    onClick={removeCurrentBookFromFav}
                  >
                    <FaHeartBroken />
                  </Button>
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Container>
    </>
  );
};
export default BookDetailPage;
