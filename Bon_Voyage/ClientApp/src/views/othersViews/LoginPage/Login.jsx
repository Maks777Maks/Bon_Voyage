import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardGroup,
         Col, Container, Form, Input, InputGroup,
         InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as loginActions from './reducer';
// import InputMask from 'react-input-mask';
import get from "lodash.get";


class Login extends Component {

  state = {
    email: '',
    password: '',
    profileUrl: '',
    errors: {},
    done: false,
    isLoading: false,
    visible: false,
    errorsServer: {}
  }

  passwordVisible = (e)=>{
    this.setState({
      visible: !this.state.visible,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
  
    return { isLoading: nextProps.loading, errorsServer: nextProps.errors };
}

  setStateByErrors = (name, value) => {
    if (!!this.state.errors[name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[name];
      this.setState(
        {
          [name]: value,
          errors
        }
      )
    }
    else {
      this.setState(
        { [name]: value })
    }
  }

  handleChange = (e) => {
    this.setStateByErrors(e.target.name, e.target.value);

  }
  onSubmitForm = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    //const regex_phone = /^(?=\+?([0-9]{2})\(?([0-9]{3})\)?([0-9]{3})-?([0-9]{2})-?([0-9]{2})).{17}$/;

    let errors = {};

    if (email === '') errors.email = "Поле є обов'язковим";
    //if (!regex_phone.test(phone)) errors.phone = "Не вiрний формат +xx(xxx)xxx-xx-xx телефону";

    if (password === '') errors.password = "Поле є обов'язковим";

    const isValid = Object.keys(errors).length === 0
    if (isValid) {
      this.setState({ isLoading: true });
      const model = {
        email: email,
        password: password
        };

      this.props.login(model, this.props.history);     
    }
    else {
      this.setState({ errors });
    }
  }
  
  render() {

    const { errors, isLoading, profileUrl, visible, errorsServer } = this.state;

    const form = (

      <div className="app flex-row ">
        <Container>
          <Row className="justify-content-center mt-5">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmitForm}>
                      {/* {!!errorsServer.invalid ?
                          <div className="alert alert-danger">
                              {errorsServer.invalid}.
                          </div> : ""} */}
                      <h1>Вхід</h1>
                      <p className="text-muted">Увійдіть до свого облікового запису</p>
                      {/* <InputGroup className="mb-3 form-group">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-phone "></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <InputMask mask="+99(999)999-99-99"
                          className={classnames('form-control', { 'is-invalid': !!errors.phone })}
                          id="phone"
                          name="phone"
                          placeholder="Номер телефону"
                          value={this.state.phone}
                          onChange={this.handleChange} />

                        {!!errors.phone ?
                          <div className="invalid-feedback">
                            {errors.phone}
                          </div> : ''}
                      </InputGroup> */}

<InputGroup className="mb-3">
                      <Input
                        type="text"
                        placeholder="Електронна пошта"
                        className={classnames("form-control", { "is-invalid": !!errors.email })}
                        id="email"
                        autocomplete="new-password"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                         />                       
                      {!!errors.email ? <div className="invalid-feedback">{errors.email}</div> : ""}
                    </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input className={classnames('form-control', { 'is-invalid': !!errors.password })}
                          type={classnames(visible ? "text" : "password")}
                          id="password"
                          name="password"
                          placeholder="Пароль"
                          autoComplete="current-password"
                          onChange={this.handleChange} />
                        <InputGroupAddon addonType="append">
                          <Button onClick={this.passwordVisible}>
                            <i className={classnames( visible? 'fa fa-eye':'fa fa-eye-slash')}></i>
                          </Button>
                        </InputGroupAddon>
                        {!!errors.password ?
                          <div className="invalid-feedback">
                            {errors.password}
                          </div> : ''}
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Вхід</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Link to="/forgot-password">
                            <Button color="link" className="px-0">Забули пароль?</Button>
                          </Link>
                        </Col>
                      </Row>
                      {/* <Row>
                      <Col xs="12" className="text-left">
                        <Link to="/" >
                          <Button color="secondary" className="mt-4" >
                              <i className="fa fa-reply-all"></i>&nbsp;На головну
                          </Button>
                        </Link>
                        </Col>
                      </Row> */}
                    </Form>
                  </CardBody>               
                </Card>               
              </CardGroup>
            </Col>
          </Row>
        </Container>
      
      </div>
    );
    return (
       form
    );
  }
}

Login.propTypes =
  {
    login: PropTypes.func.isRequired
  }

function mapStateToProps(state) {
  console.log("mapStateToProps", state);
  return {
    loading: get(state, 'login.post.loading'),
    failed: get(state, 'login.post.failed'),
    success: get(state, 'login.post.success'),
    errors: get(state, 'login.post.errors')
  }
}

const mapDispatch = {
  login: (model, history) => {
      return loginActions.login(model, history);
  }
}

export default connect(mapStateToProps, mapDispatch)(Login);