import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardLayout from "../../component/common/card.component";
import { getAllBooks } from "../../services/book.service";

const HomePage = () => {
  let [book, setBook] = useState();
  let getAllBook = async () => {
    let result = await getAllBooks();
    // console.log("test:", result);
    if (result) {
      setBook(result.result);
    }
  };
  useEffect(() => {
    getAllBook();
  }, []);

  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col sm={12}>
            <h4 className="text-center">Book</h4>
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

export default HomePage;
