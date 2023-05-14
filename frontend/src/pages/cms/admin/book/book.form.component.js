import { Button, Col, Form, FormGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

export const BookForm = ({ handleSubmit, defaultData }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    category: Yup.string().required("Category is required"),
  });

  const formik = useFormik({
    initialValues: defaultData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  useEffect(() => {
    if (defaultData) {
      formik.setValues(defaultData);
    }
  }, [defaultData]);

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="row mb-3" controlId="title">
          <Form.Label className="col-sm-3">Title:</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter title of the book"
              required={true}
              size={"sm"}
              value={formik.values.title}
              onChange={formik.handleChange}
            />

            {formik.errors.title && (
              <em className="text-danger">{formik.errors.title}</em>
            )}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="author">
          <Form.Label className="col-sm-3">Author</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="author"
              placeholder="Enter author of the book"
              required={true}
              size={"sm"}
              value={formik.values.author}
              onChange={formik.handleChange}
            />
            {formik.errors.author && (
              <em className="text-danger">{formik.errors.author}</em>
            )}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="category">
          <Form.Label className="col-sm-3">Category:</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="category"
              placeholder="Enter category of the book"
              required={true}
              size={"sm"}
              value={formik.values.category}
              onChange={formik.handleChange}
            />
            {formik.errors.category && (
              <em className="text-danger">{formik.errors.category}</em>
            )}
          </Col>
        </Form.Group>

        <Form.Group controlId="formFile" className="row mb-3">
          <Form.Label className="col-sm-3">Image:</Form.Label>
          <Col sm={3}>
            <Form.Control
              type="file"
              size="sm"
              name="image"
              // multiple
              required={formik.values.image ? false : true}
              onChange={(e) => {
                let file = e.target.files[0];
                formik.setValues({
                  ...formik.values,
                  image: file,
                });
              }}
            />
          </Col>
          <Col sm={3}>
            {formik.values.image && typeof formik.values.image === "object" ? (
              <img
                src={
                  formik.values.image &&
                  URL.createObjectURL(formik.values.image)
                }
                alt=""
                className="img img-fluid"
              />
            ) : (
              <img
                src={
                  process.env.REACT_APP_IMAGE_URL +
                  "/books/" +
                  formik.values.image
                }
                alt=""
                className="img img-fluid"
              />
            )}
          </Col>
        </Form.Group>
        <FormGroup className="row mb-3" controlId="">
          <Col sm={{ offset: 3, span: 9 }}>
            <Button variant="danger" size="sm" type="reset" className="me-2">
              <i className="fa fa-trash"></i> Cancel
            </Button>
            <Button variant="success" size="sm" type="submit">
              <i className="fa fa-paper-plane"></i> Submit
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </>
  );
};
