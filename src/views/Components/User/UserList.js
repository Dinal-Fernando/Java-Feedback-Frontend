import React, { Component } from 'react';
import {

  Button,
  Card,
  CardBody,
  CardHeader,
  Col, Form, FormGroup, Input, Label, Row,
  Modal, ModalBody, ModalFooter, ModalHeader,
  Table, FormFeedback
} from 'reactstrap';

import * as BaseService from '../../../_services/base_service.js'
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import * as alertify from 'alertify.js';

import Select from 'rc-select';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';
import localeInfo from 'rc-pagination/lib/locale/en_US';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/FadeLoader";


const emailRegex = RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

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

class UserList extends Component {

  constructor(props,context){
    super(props,context);
    this.state={
      spinner:false,
      id:'',
      is_active:'',
      count:0,
      users: [],
      showUpdate: false,
      show:false,
      currentpage:1,
      pagesize:10,
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

  toggleUpdate=()=> {

    this.setState({
      showUpdate: !this.state.showUpdate,
    });
    if(this.state.showUpdate===true){
      this.setState({
        id:'',
        supplier_name:'',
        shop_name:'',
        business_registration_no:'',
        address_line1:'',
        address_line2:'',
        city:'',
        postal_code:'',
        country_code:'',
        phone_no:'',
        country:'',
        email:'',
        is_active:'0',
      })
    }
  };

  get_user(){
    let ps=this.state.pagesize
    let cp=this.state.currentpage

    BaseService.get('/user/getall/',ps,cp)
      .then(res => {
        if(res && res.data && res.data["success"]){
          console.log(res.data["data"])
          this.setState(
            {
              count:res.data["count"],
              users: res.data["data"],
              spinner:false
            }
          )}

      },err=>{
        this.setState({
          spinner:false
        });
        alertify.alert("Cannot load the users");
      });
  };

  handleChange=e=>{
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

  userUpdate = (id) => {

    this.setState({
      spinner:true
    });
    BaseService.get('/user/getuser/',0,0,id)
      .then(res => {
          if(res && res.data && res.data["success"]){
            console.log(res.data["data"])

            this.setState(
              {
                id:res.data["data"][0]["id"],
                first_name:res.data["data"][0]["first_name"],
                last_name:res.data["data"][0]["last_name"],
                username:res.data["data"][0]["username"],
                email:res.data["data"][0]["email"],
                type:res.data["data"][0]["type"],
                showUpdate: true,
                spinner:false
              })}
          // console.log(this.state)

        },err=>{
        this.setState({
          spinner:false
        });
          alertify.alert("Cannot load the user");
        }

      );

  };

  componentDidMount() {
    this.get_user()
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
  };

  onClickPage=(current, pageSize)=>{

    this.setState({
      currentpage:current,
      pagesize:pageSize,
      spinner:true
    })

    BaseService.get('/user/getall/',pageSize,current)
      .then(res => {
        if(res && res.data && res.data["success"]){
          console.log(res.data["data"])
          this.setState(
            {
              spinner:false,
              count:res.data["count"],
              users: res.data["data"]
            }
          )

        }}, err => {
        this.setState({
          spinner:false
        });
        alertify.alert("Cannot perform the operation");
      });

  };

  onShowSizeChange=(current, pageSize)=>{
    this.setState({
      currentpage:current,
      pagesize:pageSize,
      spinner:true
    })


    BaseService.get('/user/getall/',pageSize,current)
      .then(res => {
        if(res.data && res.data["success"]){
          this.setState(
            {
              spinner:false,
              count:res.data["count"],
              isLoaded: true,
              users: res.data["data"]
            }
          )

        }}, err => {
        this.setState({
          spinner:false
        });
        alertify.alert("Cannot perform the operation");
      });
  };

  setStatus = (id,isactive) => {
    let active= !(isactive);
    let is_active;
    if (active===true){
      is_active=1
    }
    else{
      is_active=0
    }

    const obj={
      id:id,
      is_active:is_active,
    }

    this.setState({
      spinner:true
    });

    BaseService.post('/user/update/',obj)
      .then(res => {
          if(res && res.data && res.data["success"]){
            this.componentDidMount()
            alertify.success("Changed the status succesfully !");
          }

        },
        err=>{
          this.setState({
            spinner:false
          });
          alertify.alert("Cannot perform the operation");
        });
  };

  onSubmitUpdate=e=>{
    e.preventDefault();

    console.log('form is submit');
    console.log(this.state);
    if(formValid(this.state)) {
      const obj = {
        id: this.state.id,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        email: this.state.email,
        type_id: this.state.type,
      }

      this.setState({
        spinner:true
      });
      BaseService.post('/user/update/', obj)
        .then(res => {
            if (res && res.data && res.data["success"]) {
              console.log(res)
              alertify.success("User update succesfully !");
              this.componentDidMount()
            }
          }, err => {
          this.setState({
            spinner:false
          });
            alertify.alert("Cannot perform the operation");
          }
        )


      this.setState({
        first_name: '',
        username: '',
        last_name: '',
        email: '',
        type: '',
        showUpdate: false
      })
    }
    else{
      alertify.error("Please fill the form properly !");
    }
  }



  render() {

    const {users,types,formErrors} = this.state;

    return (
      <div className="animated fadeIn">

        <button type="button" className="btn btn-outline-primary" onClick={(e) => this.props.history.push('/user')}>Create User</button>

        <br/>
        <br/>


        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> Users
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

            <Table responsive>
              <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Country Code</th>
                <th>Phone No</th>
                <th>Type</th>
                <th colSpan="2">Actions</th>
              </tr>
              </thead>

              {users.map(user => (

                <tbody>
                <tr>
                  <td> {user.first_name} </td>
                  <td>{user.last_name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.country_code}</td>
                  <td>{user.phone_no}</td>
                  <td>{user.type}</td>

                  <td>
                    <div  style={{width:'60px'}}>
                      <Switch checkedChildren="Active" unCheckedChildren="Deactive" defaultChecked checked={user.is_active} onChange={(e) => this.setStatus(user.id,user.is_active, e)}/>
                    </div>
                  </td>
                  <td>
                    <div  style={{width:'60px'}}><button type="button" className="btn btn-outline-primary" onClick={(e) => this.userUpdate(user.id, e)} >Update</button></div>

                  </td>


                </tr>
                </tbody>

              ))}


            </Table>

            <div>
              <Pagination
                selectComponentClass={Select}
                showQuickJumper
                showSizeChanger
                defaultPageSize={10}
                defaultCurrent={1}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onClickPage}
                locale={localeInfo}
                total={this.state.count}
              />
            </div>


          </CardBody>
        </Card>

        <Modal isOpen={this.state.showUpdate} toggle={this.toggleUpdate}
               className={'modal-primary ' + this.props.className}>
          <Form onSubmit={this.onSubmitUpdate}>
            <ModalHeader toggle={this.toggleUpdate} >User Update</ModalHeader>
            <ModalBody>
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
                    {types.map(type => (
                      <option value={type.id}> {type.role}</option>
                    ))}
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
            </ModalBody>
            <ModalFooter>
              <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o"></i> Submit</Button>
              <Button type="reset" size="sm" color="danger" onClick={this.toggleUpdate}><i className="fa fa-ban"></i> Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>

      </div>

    );
  }
}

export default UserList;
