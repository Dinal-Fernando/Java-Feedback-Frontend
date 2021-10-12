import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import * as alertify from 'alertify.js';
import * as BaseService from "../../../../src/_services/base_service";
import HashLoader from "react-spinners/HashLoader";
import Swal from 'sweetalert2';
import './theme.css'
import cover from './background.jpg'
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';


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




class Profile extends Component {

  constructor(props,context){
    super(props,context);
    this.state={
      spinner:false,
      editorState: EditorState.createEmpty()
    };

    this.onChange = editorState => this.setState({editorState});
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


  onSubmitInsert=e=>{
    this.setState({
      spinner:true
    });
    e.preventDefault();

    if(formValid(this.state)) {
      const obj = {
        name: this.state.email,
        email: this.state.email,
        password: this.state.password2,
      };

      BaseService.postany('/register', obj)
        .then(res => {
          if(res.data) {
            if (res.data["success"]) {
              this.componentDidMount()
              alertify.success(" User Register successful !");
              this.props.history.push('/login');
              this.setState({
                email:'',
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
        text: "Please Enter Username and Password properly !"
      })
      // alertify.error("Please fill the form properly !");
    }

    };


  render() {
    const {formErrors} = this.state;
    const spinner=this.state.spinner
    return (

        <div>

          <div className="main-content">
            <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center " style={{minHeight: '500px', backgroundImage: `url(${cover})`, backgroundSize: 'cover', backgroundPosition: 'center top'}}>
              {/* Mask */}
              <span className="mask bg-gradient-default opacity-8" />
              {/* Header container */}
              <div className="container-fluid d-flex align-items-center">


              </div>
            </div>
            {/* Page content */}

            <div className="container-fluid mt--7">
              <div className="row">
                <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                  <div className="card card-profile shadow">
                    <div className="row justify-content-center">
                      <div className="col-lg-3 order-lg-2">
                        <div className="card-profile-image">
                          <a href="#">
                            <img src="https://demos.creative-tim.com/argon-dashboard/assets/img/theme/team-4.jpg" className="rounded-circle-theme" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                      <div className="d-flex justify-content-between">

                      </div>
                    </div>
                    <div className="card-body pt-0 pt-md-4">
                      <div className="row">
                        <div className="col">
                          <div className="card-profile-stats d-flex justify-content-center mt-md-5">

                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <h3>
                          Jessica Jones
                        </h3>

                        <div className="h5 mt-4">
                          <i className="ni business_briefcase-24 mr-2" />Lecturer
                        </div>
                        <div>
                          <i className="ni education_hat mr-2" />Sri Lanka Institute of Information Technology
                        </div>
                        <hr className="my-4" />
                        <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 order-xl-1">
                  <div className="card bg-secondary shadow">
                    <div className="card-header bg-white border-0">
                      <div className="row align-items-center">
                        <div className="col-8">
                          <h3 className="mb-0">Add Your Code Here</h3>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <Editor editorState={this.state.editorState} onChange={this.onChange} />

                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', paddingBottom:20}}>
                      <Button  onClick={this.onSubmitInsert} color="success" >Submit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

    );
  }
}

export default Profile;
