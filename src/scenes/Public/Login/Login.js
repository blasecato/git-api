// import LayoutPrivate from "components/layout/private";
import React from "react";
import { Button, Form, Input } from "antd";
import logoPng from "../../../assets/images/logo.png";

const Login = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section className="Login">
      <div className="Login__container">
        <div className="box--right">
          <div className="box__content">
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="box__content__form"
            >
              <img src={logoPng} className="logo" alt="logo" />
              <h2 className="h2">Sign in to GitHub</h2>
              <div className="form">
                <div className="content-items">
                  <div className="label-item">
                    <p className="label">Username or email address</p>
                  </div>
                  <Form.Item
                    name="email"
                    className="form-item"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <div className="label-item">
                    <p className="label">Password</p>
                    <a href="./" className="reset-password">
                      Forgot password?
                    </a>
                  </div>
                  <Form.Item
                    name="password"
                    className="form-item"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                </div>
                <Button htmlType="submit" className="button button-primary">
                  Sign in
                </Button>
              </div>
            </Form>
          </div>
          <div className="register">
            <div className="label-item">
              <p className="label">New to GitHub?</p>
              <a href="./" className="reset-password">
                Create an account
              </a>
            </div>
          </div>
          <div className="footer">
            <a href="./" className="item">
              Terms
            </a>
            <a href="./" className="item">
              Security
            </a>
            <a href="./" className="item">
              Privacy
            </a>
            <a href="./" className="item item-white">
              Contact GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
