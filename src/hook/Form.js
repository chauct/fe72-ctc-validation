import { Card, Input, Col, Row, Button } from "antd";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import isEmpty from "lodash.isempty";

const userSchema = yup.object().shape({
  username: yup
    .string()
    .required("*Vui lòng nhập tên")
    .matches(/^[A-Za-z ]+$/g, "*Họ tên phải nhập chữ"),
  phone: yup
    .string()
    .required("*Vui lòng nhập số điện thoại ")
    .matches(/^[0-9]+$/g),
  email: yup
    .string()
    .required("*Vui lòng nhập Email")
    .email("*Email không đúng định dạng"),
});

function Form(props) {
  const [user, setUser] = useState({
    username: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!props.selectedUser) return;
    if (props.selectedUser.id === user.id) return;

    setUser(props.selectedUser);
  }, [props.selectedUser]); //eslint-disable-line

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    if (props.selectedUser) {
      props.updateUser(user);
    } else {
      props.createUser({ ...user, id: Math.floor(Math.random() * 1000 + 1) });
    }
    resetForm();
  }

  async function validateForm() {
    const validationErrors = {};
    try {
      await userSchema.validate(user, {
        abortEarly: false,
      });
    } catch (err) {
      const errObj = { ...err };

      errObj.inner.forEach((validationError) => {
        if (validationErrors[validationError.path]) return;
        validationErrors[validationError.path] = validationError.message;
      });

      setErrors(validationErrors);
    }

    return isEmpty(validationErrors);
  }

  function resetForm() {
    setUser({
      id: "",
      username: "",
      email: "",
      phone: "",
    });
  }

  return (
    <Card
      className="card"
      title="Thông tin sinh viên "
      headStyle={{
        backgroundColor: "#000000",
        color: "#ffffff",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Row>
          <Col className="padding" span={12}>
            <label>Mã SV</label>
            <Input
              value={user.id}
              onChange={handleChange}
              name="id"
              size="large"
            />
            <span>{errors.id}</span>
          </Col>
          <Col className="padding" span={12}>
            <label>Họ tên</label>
            <Input
              value={user.username}
              onChange={handleChange}
              name="username"
              size="large"
            />
            <span>{errors.username}</span>
          </Col>
        </Row>
        <Row>
          <Col className="padding" span={12}>
            <label>Số điện thoại</label>
            <Input
              value={user.phone}
              onChange={handleChange}
              name="phone"
              size="large"
            />
            <span>{errors.phone}</span>
          </Col>
          <Col className="padding" span={12}>
            <label>Email</label>
            <Input
              value={user.email}
              onChange={handleChange}
              name="email"
              size="large"
            />
            <span>{errors.email}</span>
          </Col>
        </Row>
        <div className="btn">
          <Button htmlType="submit" size="large" type="primary">
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Form;
