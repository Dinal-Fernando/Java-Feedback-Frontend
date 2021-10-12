import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody, CardHeader,
  Col,
  Container,
  Form, FormFeedback,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';
import * as alertify from 'alertify.js';
import * as BaseService from '../../../_services/base_service'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/FadeLoader";

const numberRegex = RegExp(
  /^[0-9]*$/
);

const formValid = ({formErrors, ...rest}) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

const emailRegex = RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);


class Register extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      spinner:false,
      types: [],
      first_name: '',
      username: '',
      last_name: '',
      email: '',
      type: '',
      formErrors: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
      }

    }

  }

  componentDidMount() {
    BaseService.get('/user/type/')
      .then(res => {
          if (res.data && res) {
            this.setState(
              {
                types: res.data
              }
            )

          }
        }, err => {
          alertify.alert("Cannot load the user types");
        }
      );
  }

  handleChange = e => {
    e.preventDefault();

    const {name, value} = e.target;
    let formErrors = {...this.state.formErrors};

    switch (name) {
      case "first_name":
        formErrors.first_name = value.length < 4 ? "Minimum 4 characters required" : "";
        break;
      case "last_name":
        formErrors.last_name = value.length < 4 ? "Minimum 4 characters required " : "";
        break
      case "username":
        formErrors.username = value.length < 5 ? "Minimum 5 characters required " : "";
        break
      case "email":
        formErrors.email = emailRegex.test(value) ? "" : "Email is not valid";
        break
      default:

    }

    this.setState({
      formErrors, [name]: value
    });
  };

  onSubmitInsert = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      const obj = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        email: this.state.email,
        type: this.state.type,
      };

      this.setState({
        spinner:true
      });

      BaseService.post('/user/save/', obj)
        .then(res => {
          if (res && res.data) {
            if (res.data["success"]) {
              alertify.success("User insert succesfully !");
              this.setState({
                first_name: '',
                username: '',
                last_name: '',
                email: '',
                type: '',
                spinner:false
              })

              this.props.history.push('/userlist')
            } else {
              this.setState({
                spinner:false
              });
              alertify.alert("Cannot perform the operation");
            }
          }
        })


    } else {
      alertify.error("Please fill the form properly !");
    }
  }

  render() {
    const {formErrors, types} = this.state;
    return (


      <div className="animated fadeIn">
        {localStorage.getItem("Type") == 3 ?
          <Card className="card-accent-primary">
            <CardHeader>
              Create User
            </CardHeader>
            <CardBody>

              <div className={this.state.spinner ? 'parentDisable' : ''} width="100%">
                <div className='overlay-box'>
                  <ClipLoader

                    size={150}
                    color={"#123abc"}
                    loading={this.state.spinner}
                  />
                </div>
              </div>

              <Form>
                <FormGroup row>
                  <Col md="6">
                    <Label>First Name</Label>
                    <Input required invalid={formErrors.first_name} type="text" placeholder="Enter First Name"
                           value={this.state.first_name}
                           onChange={this.handleChange} name="first_name"/>
                    {this.state.formErrors.first_name.length > 0 && (
                      <FormFeedback className="help-block">{this.state.formErrors.first_name}</FormFeedback>
                    )}
                  </Col>

                  <Col md="6">
                    <Label>Last Name</Label>
                    <Input required invalid={formErrors.last_name} type="text" placeholder="Enter Last Name"
                           value={this.state.last_name}
                           onChange={this.handleChange} name="last_name"/>
                    {this.state.formErrors.last_name.length > 0 && (
                      <FormFeedback className="help-block">{this.state.formErrors.last_name}</FormFeedback>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="6">
                    <Label>User Name</Label>
                    <Input required invalid={formErrors.username} type="text" placeholder="Enter Username"
                           value={this.state.username}
                           onChange={this.handleChange} name="username"/>
                    {this.state.formErrors.username.length > 0 && (
                      <FormFeedback className="help-block">{this.state.formErrors.username}</FormFeedback>
                    )}
                  </Col>

                  <Col md="6">
                    <Label>User Type</Label>
                    <Input type="select" value={this.state.type} onChange={this.handleChange} name="type">
                      <option value="none"> Select a User Type</option>

                      <option value={2}> Admin</option>
                      <option value={3}> User</option>

                    </Input>
                  </Col>


                </FormGroup>

                <FormGroup>
                  <Label>E mail</Label>
                  <Input required invalid={formErrors.email} type="text" placeholder="Enter email"
                         value={this.state.email}
                         onChange={this.handleChange} name="email"/>
                  {this.state.formErrors.email.length > 0 && (
                    <FormFeedback className="help-block">{this.state.formErrors.email}</FormFeedback>
                  )}
                </FormGroup>

                <div style={{float: "right"}}>
                <span style={{marginRight: "10px"}}>
                <Button type="submit" onClick={this.onSubmitInsert} size="sm" color="primary"><i
                  className="fa fa-dot-circle-o"></i> Submit</Button>
                </span>

                </div>
              </Form>
            </CardBody>

          </Card>
        :
          <div>
          <Card className="card-accent-primary">
            <CardHeader>
              User
            </CardHeader>
            <CardBody>
              <h1>You cannot create the user</h1>
            </CardBody>
          </Card>
          </div>
        }

      </div>
    );
  }
}

export default Register;
