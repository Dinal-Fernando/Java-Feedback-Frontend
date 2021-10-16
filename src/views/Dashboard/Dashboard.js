import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import * as alertify from 'alertify.js';
import * as BaseService from "../../../src/_services/base_service";
import HashLoader from "react-spinners/HashLoader";
import Swal from 'sweetalert2';
import './theme.css'
import cover from './background.jpg'
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";


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

class Dashboard extends Component {

  constructor(props,context){
    super(props,context);
    this.state={
      spinner:false,
      name:localStorage.getItem("Name"),
      is_student:localStorage.getItem("IsStudent"),
      pro_pic:localStorage.getItem("ProfilePic"),
      index_no:localStorage.getItem("Index"),
      code:"// Add Your Code",
    };

  }

  handleChange=e=>{
    e.preventDefault();
    const {name,value}=e.target;

    this.setState({
      [name]:value
    },() => console.log("go"))  ;
  };

  handleChangeCode=(value,event)=>{
    this.setState({
        code:value
    });
  };

  onSubmitInsert=e=>{
    this.setState({
      spinner:true
    });

    const obj = {
      code: this.state.code,
    };

    console.log(obj);

    BaseService.post('/user/add_code/', obj)
      .then(res => {
        if(res.data) {
          if (res.data["status"]===100) {
            alertify.success("Code Uploaded Successful !");
            // window.location.reload();
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: res.data["message"]
            })
          }
        }
        this.setState({
          spinner:false
        });
      })

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
                          <img src={this.state.pro_pic} className="rounded-circle-theme" />
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
                        {this.state.name}
                      </h3>
                      {this.state.is_student==="1" && (
                        <div className="h5 mt-4">
                          <i className="ni business_briefcase-24 mr-2" />Student
                          <i className="ni business_briefcase-24 mr-2" />{this.state.index_no}
                        </div>
                      )}
                      {this.state.is_student==="0" && (
                        <div className="h5 mt-4">
                          <i className="ni business_briefcase-24 mr-2" />Lecturer
                        </div>
                      )}

                      <div>
                        <i className="ni education_hat mr-2" />Sri Lanka Institute of Information Technology
                      </div>
                      <hr className="my-4" />
                      <p>We are a leading non-state degree awarding institute approved by the University Grants Commission (UGC) under the Universities Act. We are also members of the Association of Commonwealth Universities (ACU), as well as the International Association of Universities (IAU), and the first Sri Lankan institute to be accredited by the Institution of Engineering & Technology, UK.</p>

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
                    <Editor
                      height="40vh"
                      defaultLanguage="java"
                      defaultValue={this.state.code}
                      onChange={this.handleChangeCode}
                    />

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

export default Dashboard;
