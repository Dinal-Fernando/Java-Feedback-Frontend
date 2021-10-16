import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import * as alertify from 'alertify.js';
import * as BaseService from "../../../../src/_services/base_service";
import HashLoader from "react-spinners/HashLoader";
import Swal from 'sweetalert2';
import ImageUploader from 'react-images-upload';

const emailRegex = RegExp(
  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  return valid;
};


const fieldValid = (obj) => {
  let valid = true;
  Object.values(obj).forEach(val => {
    val.length === 0 && (valid = false);
  });
  return valid;
};



class Register extends Component {

  constructor(props,context){
    super(props,context);
    this.state={
      spinner:false,
      name:'',
      index_no:'',
      role_key:'',
      email:'',
      profile_pic:'',
      password1:'',
      password2:'',
      formErrors:{
        email:'',
        password1: '',
        password2:''
      }

    }

  }


  handleChange=e=>{
    e.preventDefault();
    const {name,value}=e.target;
    let formErrors={...this.state.formErrors};
    if(name === "email"){
      formErrors.email=emailRegex.test(value) ? "" : "Email is not valid";
      if (value===""){
        formErrors.email=""
      }
    }
    if (name === "password2") {
      if (value===""){
        formErrors.password2=""
      }
      else if( value===this.state.password1 ) {
        formErrors.password2 = ""
      }
      else{
        formErrors.password2 ="Password is not match" ;

      }

    }
    this.setState({
      formErrors,[name]:value
    },() => console.log("go"))  ;
  };


  onDrop=(pictureFiles, pictureDataURLs) =>{
    this.setState({
      profile_pic: pictureDataURLs[0]
    });
  };

  handleLogin=(e)=>{
    this.props.history.push('/login');
  };

  onSubmitInsert=e=>{
    this.setState({
      spinner:true
    });
    e.preventDefault();

    if(formValid(this.state)) {
      const obj = {
        name: this.state.name,
        pro_pic:[this.state.profile_pic],
        email: this.state.email,
        index_no:this.state.index_no,
        role_key:this.state.role_key,
        password: this.state.password2,
      };

      const check_obj={
        name: this.state.name,
        pro_pic:[this.state.profile_pic],
        email: this.state.email,
        role_key:this.state.role_key,
        password: this.state.password2,
      };



      if (fieldValid(check_obj)){
        BaseService.postany('/user/sign_up/', obj)
          .then(res => {
            if(res.data) {
              if (res.data["status"]===100) {
                alertify.success(" User Register successful !");
                this.props.history.push('/login');
                this.setState({
                  name: '',
                  profile_pic:'',
                  email:'',
                  index_no:'',
                  role_key:'',
                  password1:'',
                  password2:'',
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
      }



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
    const {formErrors} = this.state;
    const spinner=this.state.spinner;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <div className={spinner ? 'parentDisable' : ''} width="100%">
                  <div className='overlay-box'>
                    <HashLoader
                      size={100}
                      color={"#123abc"}
                      loading={spinner}
                    />
                  </div>
                </div>
                <CardBody className="p-4">
                  <div >
                    <img src={require('./sliit_logo.png')} className="login_image" />
                  </div>

                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Name" name="name" id="name" value={this.state.name} onChange={this.handleChange} required/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user-following"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="select" name="role_key" id="role_key" onChange={this.handleChange}>
                        <option value="">Select Role Type</option>
                        <option value={"lecturer"}>Lecturer</option>
                        <option value={"student"}>Student</option>
                      </Input>
                    </InputGroup>

                    {this.state.role_key === "student" && (
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Index No" name="index_no" id="index_no" value={this.state.index_no} onChange={this.handleChange} required/>
                      </InputGroup>
                    )}

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          @
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input required invalid={formErrors.email}  type="text" placeholder="E-mail"  value={this.state.email}
                             onChange={this.handleChange} name="email" />
                      {formErrors.email.length > 0 && (
                        <span style={{color:"red"}} className="errorMessage">{formErrors.email}</span>
                      )}
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" required invalid={formErrors.password1}  value={this.state.password1}
                             onChange={this.handleChange} name="password1" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat Password" required invalid={formErrors.password2}  value={this.state.password2}
                             onChange={this.handleChange} name="password2"  />
                      {formErrors.password2.length > 0 && (
                        <span style={{color:"red"}} className="errorMessage">{formErrors.password2}</span>
                      )}
                    </InputGroup>

                    <ImageUploader
                      withIcon={true}
                      buttonText="Choose image for the Profile"
                      onChange={this.onDrop}
                      imgExtension={[".jpg",".png"]}
                      maxFileSize={5242880}
                      singleImage={true}
                      withPreview={true}
                    />

                    <Button onClick={this.onSubmitInsert} color="success" block>Create Account</Button>

                    <Button color="link" className="px-0" style={{float:"right"}} onClick={this.handleLogin}>Sign In</Button>
                  </Form>
                </CardBody>

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
