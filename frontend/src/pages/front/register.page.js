import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../services/auth.services";

const RegisterPage = () => {
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

  let navigate = useNavigate();

  const registerValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short name")
      .max(50, "Too Long name")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be atleast 8 characters long")
      .required("Password is required"),
    role: Yup.array().of(Yup.string(["reader", "admin"])),
  });

  const handleSubmit = async (values) => {
    if (values.role.length <= 0) {
      formik.setErrors({
        ...formik.errors,
        role: "Role is required",
      });
    } else {
      try {
        console.log(values);
        let response = await registerUser(values);
        console.log("response:", response);
        if (response.status) {
          toast.success(response.msg);
          navigate("/" + response.result.role[0]);
        } else {
          toast.error(response.msg);
        }
      } catch (msg) {
        toast.error(msg);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: [],
      image: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: handleSubmit,
  });
  // console.log(formik.errors);
  return (
    <>
      <Container>
        <ToastContainer />
        <Row>
          <Col sm={12} md={{ offset: 1, span: 9 }}>
            <h4 className="text-center"> Register Page</h4>
            <hr />
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="row mb-3" controlId="name">
                <Form.Label className="col-sm-3">Name:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="name"
                    name="name"
                    placeholder="Enter your name"
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
              <Form.Group className="row mb-3" controlId="role">
                <Form.Label className="col-sm-3">Role:</Form.Label>
                <Col sm={9}>
                  <Select
                    options={roles}
                    isMulti
                    size="sm"
                    className="form-control-sm"
                    required
                    name="=role"
                    onChange={(selectedOptions) => {
                      let roles = [];
                      selectedOptions.forEach((item) => {
                        roles.push(item.value);
                      });
                      formik.setValues({
                        ...formik.values,
                        role: roles,
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
                      console.log(file);
                    }}
                  />
                </Col>
                <Col sm={3}>
                  <img
                    src={
                      formik.values.image &&
                      URL.createObjectURL(formik.values.image)
                    }
                    alt=""
                    className="img img-fluid"
                  />
                </Col>
              </Form.Group>
              <Button
                variant="danger"
                type="reset"
                size="sm"
                className="me-2"
                onClick={formik.resetForm}
              >
                Cancel
              </Button>
              <Button variant="success" size="sm" type="submit">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPage;
