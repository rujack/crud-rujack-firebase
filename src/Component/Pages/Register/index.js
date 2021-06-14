import React, { Component } from 'react'
import { Form, Container } from 'react-bootstrap'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import './Register.css'
import ButtonRegister from '../../Common/Button'
import { registerUserAPI } from '../../../Config/redux/action'
import { connect } from 'react-redux'

class Register extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleRegister = async () => {
    const { email, password } = this.state;
    // console.log("email : ", email);
    // console.log("password : ", password);
    const res = await this.props.registerAPI({ email, password }).catch(err => err)
    if (res) {
      // console.log("Register Berhasil");
      this.setState({
        email: "",
        password: "",
      });
    } else {
      alert("Register Gagal");
    }
  };
  
  render() {
    return (
      <div>
        <Container>
          <Form className="form-register">
            <h1>Register</h1>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={this.handleChangeText}
                value={this.state.email}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={this.handleChangeText}
                value={this.state.password}
              />
            </Form.Group>
            <div className="text-center">
              <ButtonRegister
                onClick={this.handleRegister}
                title="Register"
                loading={this.props.isLoading}
              />
            </div>
            <div className="text-center">
              <Link className="btn btn-link" to="/login">
                Back to Login <FontAwesomeIcon icon={faArrowLeft} />
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
  registerAPI: (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);