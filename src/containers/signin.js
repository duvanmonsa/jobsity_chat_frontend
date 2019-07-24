import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, notification } from 'antd';

import authAction from '../redux/auth/actions';

const { login } = authAction;

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        this.props.login({
          username: values.username,
          password: values.password
        })
          .then(() => this.setState({ loading: false }))
          .catch(err => {
            this.setState({ loading: false });
            const args = {
              message: 'Login Error',
              description: `Couldn't login!`
            };
            notification.error(args);
          });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">

            <Form onSubmit={this.handleLogin} className="isoSignInForm">
              <Form.Item className="isoInputWrapper" hasFeedback>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      type: 'email',
                      message: "Required email"
                    },
                    {
                      required: true,
                      message: "Must be email"
                    }
                  ]
                })(
                  <Input
                    className="username"
                    size="large"
                    placeholder="Email"
                    onChange={e => this.setState({ username: e.target.value })}
                  />
                )}
              </Form.Item>
              <Form.Item hasFeedback className="isoInputWrapper">
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: "Required password"
                    },
                    {
                      min: 6,
                      message: "Min 6"
                    }
                  ]
                })(
                  <Input
                    className="password"
                    size="large"
                    type="password"
                    placeholder="Password"
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                )}
              </Form.Item>
              <div className="isoInputWrapper isoLeftRightComponent">
                <Button type="primary" htmlType="submit" loading={this.state.loading}>
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default
  connect(
    state => ({
      isLoggedIn: state.Auth.idToken !== null ? true : false
    }),
    { login }
  )(Form.create()(SignIn));
