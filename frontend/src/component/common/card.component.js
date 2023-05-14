import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import noImageFound from "../../assets/image/no-image-found.jpg";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaHeartBroken } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addBookToFav, removeBookFromFav } from "../../reducer/fav.reducer";
const CardLayout = ({ data, type }) => {
  const handelError = (e) => {
    e.target.src = noImageFound;
  };

  let dispatch = useDispatch();
  let all_fav = useSelector((store) => {
    return store.fav.favDetail;
  });
  const addCurrentBookToFav = () => {
    dispatch(addBookToFav({ book_id: data._id }));
  };
  const removeCurrentBookFromFav = () => {
    dispatch(removeBookFromFav({ book_id: data._id }));
  };

  return (
    <>
      <Card>
        <ToastContainer />
        <Card.Img
          variant="top"
          src={process.env.REACT_APP_IMAGE_URL + "/" + type + "/" + data.image}
          onError={handelError}
          className="thumb-small"
        />
        <hr />

        <Card.Title>
          <p className="text-center">
            <Tippy content={data.title.toUpperCase()}>
              {data.slug ? (
                <NavLink to={"/book/byslug/" + data.slug} className="nav-link">
                  {data.title && data.title.length >= 10
                    ? data.title.toUpperCase().slice(0, 10) + "..."
                    : data.title.toUpperCase()}
                </NavLink>
              ) : (
                <>{data.title.toUpperCase().slice(0, 10) + "..."}</>
              )}
            </Tippy>
          </p>
          <div className="text-center">
            <Button
              variant="warning"
              type="button"
              size="sm"
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
          </div>
        </Card.Title>
      </Card>
    </>
  );
};
export default CardLayout;
