import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";

let defaultData = {
  email: "",
  password: "",
};
const LoginPage = () => {
  let [data, setData] = useState(defaultData);
  let [err, setErr] = useState(defaultData);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(data);
      let response = await loginUser(data);
      if (response.status) {
        toast.success(response.msg);
        navigate("/" + response.result.user.role[0]);
      } else {
        toast.error(response.msg);
      }
    } catch (msg) {
      toast.error(msg);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    validateData(e.target);
  };
  const validateData = ({ name, value, required }) => {
    if (required) {
      let err_msg = "";
      switch (name) {
        case "email":
          err_msg = required && !value ? "Email is required" : null;
          break;
        case "password":
          err_msg =
            required && !value
              ? "Password is required"
              : value.length < 8
              ? "Password must be atleast 8 characters"
              : null;
          break;
        default:
          break;
      }

      setErr({
        ...err,
        [name]: err_msg,
      });
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("auth_token");
    let user = JSON.parse(localStorage.getItem("auth_user"));
    if (!token || !user) {
      localStorage.clear();
    } else {
      navigate("/" + user.role[0]);
    }
  }, [navigate]);

  return (
    <>
      <Container fluid>
        <ToastContainer />
        <Row>
          <Col sm={12} md={{ offset: 3, span: 6 }}>
            <h4 className="text-center"> Login Page</h4>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Email:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required={true}
                    size={"sm"}
                    onChange={handleChange}
                  />
                  <em className="text-danger">{err?.email}</em>
                </Col>
              </Form.Group>
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Password:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required={true}
                    size={"sm"}
                    onChange={handleChange}
                  />
                  <em className="text-danger">{err?.email}</em>
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>

              <Button variant="danger" type="reset" size="sm" className="me-2">
                Cancel
              </Button>
              <Button variant="success" size="sm" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
