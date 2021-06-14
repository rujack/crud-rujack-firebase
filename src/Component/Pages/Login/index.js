import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Form, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUserAPI } from "../../../Config/redux/action";
import ButtonRegister from "../../Common/Button";
import "./Login.css";

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleLogin = async (e) => {
    const { email, password } = this.state
    const { history } = this.props;
    const res = await this.props.loginAPI({ email, password }).catch(err => err)
    if (res) {
      localStorage.setItem('userData',JSON.stringify(res))
      
      this.setState({
        email: '',
        password: '',
      })
      history.push('/')
    } else {
      alert('Login GAGAL')
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Form className="form-login">
            <h1>Login</h1>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={this.handleChangeText} value={this.state.email} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.handleChangeText} value={this.state.password} />
            </Form.Group>
            <div className="text-center">
              <ButtonRegister onClick={this.handleLogin} title="Login" loading={this.props.isLoading} />
            </div>
            <div className="text-center">
              <Link className="btn btn-link" to="/register">
                Register <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </Form>
        </Container>
      </div>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Login);