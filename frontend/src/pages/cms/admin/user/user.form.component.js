import { Button, Col, Form, FormGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import Select from "react-select";

export const UserForm = ({ handleSubmit, defaultData, edit }) => {
  let roles = [
    {
      value: "reader",
      label: "Reader",
    },
    {
      value: "admin",
      label: "Admin",
    },
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short name")
      .max(50, "Too Long name")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be atleast 8 characters long")
      .required("Password is required"),
    role: Yup.object().nullable(),
  });

  const formik = useFormik({
    initialValues: defaultData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
  });
  useEffect(() => {
    if (defaultData) {
      let sel_roles = defaultData.role.map((item) => {
        return {
          value: item,
          label: item === "reader" ? "Reader" : "Admin",
        };
      });

      formik.setValues({
        ...defaultData,
        role: sel_roles,
      });
    }
  }, [defaultData]);

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="row mb-3" controlId="name">
          <Form.Label className="col-sm-3">Name:</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="name"
              name="name"
              placeholder="Enter your name"
              defaultValue={formik.values.name}
              required={true}
              size={"sm"}
              onChange={formik.handleChange}
            />
            {formik.errors.name && (
              <em className="text-danger">{formik.errors.name}</em>
            )}
          </Col>
        </Form.Group>
        <Form.Group className="row mb-3" controlId="email">
          <Form.Label className="col-sm-3">Email:</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="email"
              name="email"
              defaultValue={formik.values.email}
              readOnly={edit}
              placeholder="Enter your email"
              required={true}
              size={"sm"}
              onChange={(e) => {
                formik.setValues({
                  ...formik.values,
                  email: e.target.value,
                });
              }}
            />
            {formik.errors.email && (
              <em className="text-danger">{formik.errors.email}</em>
            )}
          </Col>
        </Form.Group>

        {!edit && (
          <Form.Group className="row mb-3" controlId="password">
            <Form.Label className="col-sm-3">Password:</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                required={true}
                size={"sm"}
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <em className="text-danger">{formik.errors.password}</em>
              )}
            </Col>
          </Form.Group>
        )}

        <Form.Group className="row mb-3" controlId="role">
          <Form.Label className="col-sm-3">Role:</Form.Label>
          <Col sm={9}>
            <Select
              options={roles}
              size="sm"
              className="form-control-sm"
              value={formik.values.role}
              required
              name="=role"
              onChange={(selectedOptions) => {
                console.log(selectedOptions);
                formik.setValues({
                  ...formik.values,
                  role: selectedOptions,
                });
              }}
            ></Select>
            {formik.errors.role && (
              <em className="text-danger">{formik.errors.role}</em>
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
              onChange={(e) => {
                let file = e.target.files[0];
                formik.setValues({
                  ...formik.values,
                  image: file,
                });
                // console.log("test", typeof file);
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
                  "/user/" +
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
