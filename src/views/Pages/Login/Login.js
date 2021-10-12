import React, { Component } from 'react';
import HashLoader from "react-spinners/HashLoader";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import * as alertify from 'alertify.js';
import * as BaseService from "../../../../src/_services/base_service";
import Swal from 'sweetalert2';

const emailRegex = RegExp(
  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
);

const formValid = ({ formErrors,fields, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  Object.values(fields).forEach(val => {
    val.length === 0 && (valid = false);
  });
  return valid;
};

class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      fields:{
        email:'',
        password:'',
      },
      show:false,
      spinner:false,
      formErrors: {
        email:'',
        password:'',
      },
    }

  }

  handleChange=(e)=>{
    e.preventDefault();

    const {name,value}=e.target;
    let formErrors={...this.state.formErrors};
    let fields={...this.state.fields};

    switch(name){
      case "email":
        formErrors.email=emailRegex.test(value) ? "" : "Email is not valid";
        if (value===""){
          formErrors.email=""
        }
        break;
      case "password":
        formErrors.password=value.length<4? "Password is not valid ":"";
        if (value===""){
          formErrors.password=""
        }
        break
      default:

    }
    fields[name]=value;

    this.setState({
      formErrors,fields
    }) ;

  };

  handleRegister=(e)=>{
    this.props.history.push('/register');
  };


  onSubmitInsert=e=>{
    this.setState({
      spinner:true
    });
    e.preventDefault();

    if(formValid(this.state)) {
      const obj = {
        email: this.state.fields.email,
        password: this.state.fields.password,
      };

      BaseService.postany('/user/sign_in/', obj)
        .then(res => {
          if(res.data) {
            if (res.data["status"]===100) {
              alertify.success("Logging Successful !");
              localStorage.setItem("AccessToken", res.data["data"]["access_token"]);
              localStorage.setItem("RefreshToken", res.data["data"]["refresh_token"]);
              localStorage.setItem("Name", res.data["data"]["name"]);
              localStorage.setItem("ProfilePic", res.data["data"]["logo_url"]);
              localStorage.setItem("IsStudent", res.data["data"]["is_student"]);
              this.props.history.push('/profile');
              this.setState({
                fields:{
                  email:'',
                  password:'',
                },
                formErrors: {
                  email:'',
                  password:'',
                },
              })
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.data["message"]
              })
              // alertify.alert(res.data["message"]);
            }
          }
          this.setState({
            spinner:false
          });
        })



    }
    else{
      this.setState({
        spinner:false
      });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Please Fill All The Fields properly !"
      })
      // alertify.error("Please fill the form properly !");
    }

  };



  render() {
   const spinner=this.state.spinner

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <div className={spinner ? 'parentDisable' : ''} width="100%">
                    <div className='overlay-box'>
                      <HashLoader
                        size={100}
                        color={"#123abc"}
                        loading={spinner}
                      />
                    </div>
                  </div>
                  <CardBody>

                    <div >
                      <img src={require('./sliit_logo.png')} className="login_image" />
                    </div>


                    <Form onSubmit={this.handleSubmit}>

                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input required type="text" invalid={this.state.formErrors.email}  placeholder="E-mail" name="email" value={this.state.email} onChange={this.handleChange} />
                        {this.state.formErrors.email.length > 0 && (
                          <FormFeedback className="help-block">{this.state.formErrors.email}</FormFeedback>
                        )}
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input required type="password" invalid={this.state.formErrors.password} placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                        {this.state.formErrors.password.length > 0 && (
                          <FormFeedback className="help-block">{this.state.formErrors.password}</FormFeedback>
                        )}
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.onSubmitInsert}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0" onClick={this.handleRegister}>Register New User</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>

              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
