import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import * as alertify from 'alertify.js';
import * as BaseService from '../../../_services/base_service'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/FadeLoader";
const numberRegex = RegExp(
  /^[0-9]*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

const convertToObject = (url) => {
  const arr = url.slice(1).split(/&|=/); // remove the "?", "&" and "="
  let params = {};
  for(let i = 0; i < arr.length; i += 2){
    const key = arr[i], value = arr[i + 1];
    params[key] = value ; // build the object = { limit: "10", page:"1", status:"APPROVED" }
  }
  return params;
};

class ForgetPassword extends Component {

  constructor(props,context){
    super(props,context);
    this.state={
      spinner:false,
      id:'',
      password1:'',
      password2:'',
      formErrors:{
        password1: '',
        password2:''
      }

    }

  }

  componentDidMount() {
    const uri = this.props.location.search; // "?status=APPROVED&page=1&limit=20"
    const obj = convertToObject(uri);
    console.log(obj["token"])
    console.log(obj["user_id"])
    if (obj["token"] && obj["user_id"]) {
    } else {
      this.setState({
        id: '',
        password2: '',
        password1: ''
      })
      alertify.alert("Cannot perform the operation");
      // this.props.history.push('/login');
    }
  }


  handleChange=e=>{
    e.preventDefault();

    const {name,value}=e.target;
    let formErrors={...this.state.formErrors};


    switch(name) {

      case "password2":
        if( value===this.state.password1 ) {
          formErrors.password2 =""
        }
        else
          formErrors.password2 ="Password is not match" ;
        break

      default:


    }

    this.setState({
      formErrors,[name]:value
    },() => console.log("go"))  ;
  };


  onSubmitInsert=e=>{
    e.preventDefault();

    console.log('form is submit');
    const uri = this.props.location.search; // "?status=APPROVED&page=1&limit=20"
    const object = convertToObject(uri);


      if(formValid(this.state)) {
        const obj = {

          id: String(object["user_id"]),
          token:String(object["token"]),
          password: this.state.password2,
        };

        this.setState({
          spinner:true
        });
        BaseService.postany('/user/update/', obj)
          .then(res => {
            if(res.data) {
              if (res.data["success"]) {
                this.componentDidMount()
                this.setState({
                  spinner:false
                });
                alertify.success("User update succesfully !");
                this.props.history.push('/login');
                this.setState({
                  id: '',
                  password2:'',
                  password1:'',
                })
              } else {
                this.setState({
                  spinner:false
                });
                alertify.alert("Cannot perform the operation");
              }
            }
          })



      }
      else{
        alertify.error("Please fill the form properly !");
      }
    }





  render() {
    const {formErrors} = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">

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
                    <h1>Forget Password</h1>
                    <p className="text-muted">Create your new password</p>
                    {/*<InputGroup className="mb-3">*/}
                    {/*  <InputGroupAddon addonType="prepend">*/}
                    {/*    <InputGroupText>*/}
                    {/*      <i className="icon-location-pin"></i>*/}
                    {/*    </InputGroupText>*/}
                    {/*  </InputGroupAddon>*/}
                    {/*  <Input type="select"  value={this.state.country_code} onChange={this.handleChange}  name="country_code">*/}
                    {/*    <option value="+94"  >+94</option>*/}
                    {/*    <option value="+81"  >+81</option>*/}
                    {/*    <option value="+49"  >+49</option>*/}
                    {/*    <option value="+44"  >+44</option>*/}
                    {/*    <option value="+1"  >+1</option>*/}
                    {/*  </Input>*/}
                    {/*</InputGroup>*/}
                    {/*<InputGroup className="mb-3">*/}
                    {/*  <InputGroupAddon addonType="prepend">*/}
                    {/*    <InputGroupText>*/}
                    {/*      <i className="icon-phone"></i>*/}
                    {/*    </InputGroupText>*/}
                    {/*  </InputGroupAddon>*/}
                    {/*  <Input required invalid={formErrors.phone_no}  type="text" placeholder="Enter Phone No"  value={this.state.phone_no}*/}
                    {/*         onChange={this.handleChange} name="phone_no" />*/}
                    {/*  {formErrors.phone_no.length > 0 && (*/}
                    {/*    <span style={{color:"red"}} className="errorMessage">{formErrors.phone_no}</span>*/}
                    {/*  )}*/}
                    {/*</InputGroup>*/}

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
                    <Button onClick={this.onSubmitInsert} color="success" block>Reset Password</Button>
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

export default ForgetPassword;
