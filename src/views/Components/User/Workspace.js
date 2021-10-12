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

import * as BaseService from '../../../_services/base_service'
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import * as alertify from 'alertify.js';

import Select from 'rc-select';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';
import localeInfo from 'rc-pagination/lib/locale/en_US';


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

class Workspace extends Component {

  constructor(props,context){
    super(props,context);
    this.state={
      id:'',
      workspace_name:'',
      is_active:'0',
      address_line1:'',
      address_line2:'',
      count:0,
      city:'',
      postal_code:'0',
      country_code:'+94',
      phone_no:'0',
      country:'Sri Lanka',
      email:'',
      workspaces: [],
      isLoaded:false,
      showUpdate: false,
      showInsert: false,
      showDelete:false,
      show:false,

      currentpage:1,
      pagesize:10,

      formErrors:{
        workspace_name:'',
        address_line1:'',
        address_line2:'',
        city:'',
        postal_code:'',
        phone_no:'',
        email:'',
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
        workspace_name:'',
        address_line1:'',
        address_line2:'',
        city:'',
        postal_code:'',
        country_code:'+94',
        phone_no:'',
        country:'Sri Lanka',
        email:'',
        is_active:'0',
      })
    }
  };

  toggleShow=()=> {

    this.setState({
      show: !this.state.show,
    });
    if(this.state.show===true){
      this.setState({
        id:'',
        workspace_name:'',
        address_line1:'',
        address_line2:'',
        city:'',
        postal_code:'',
        country_code:'+94',
        phone_no:'',
        country:'Sri Lanka',
        email:'',
        is_active:'0',
      })
    }
  };

  toggleInsert=()=> {

    this.setState({
      showInsert: !this.state.showInsert,
    });
    if(this.state.showInsert===true){
      this.setState({
        id:'',
        workspace_name:'',
        address_line1:'',
        address_line2:'',
        city:'',
        postal_code:'',
        country_code:'+94',
        phone_no:'',
        country:'Sri Lanka',
        email:'',
        is_active:'0',
      })
    }
  };

  get_workspaces(){
    let ps=this.state.pagesize
    let cp=this.state.currentpage

    BaseService.get('/workspace/get/',ps,cp)
      .then(res => {
        if(res && res.data && res.data["success"]){
        console.log(res.data["data"])
        this.setState(
          {
            count:res.data["count"],
            isLoaded: true,
            workspaces: res.data["data"]
          }
        )}

      },err=>{
        alertify.alert("Cannot load the supplier");
      });
  };

  handleChange=e=>{
    e.preventDefault();

    const {name,value}=e.target;
    let formErrors={...this.state.formErrors};

    switch(name) {
      case "workspace_name":
        formErrors.workspace_name = value.length < 4 ? "Minimum 4 characters required" : "";
        break;
      case "address_line1":
        formErrors.address_line1 = value.length < 4 ? "Minimum 4 characters required" : "";
        break;
      case "address_line2":
        formErrors.address_line2 = value.length < 4 ? "Minimum 4 characters required " : "";
        break
      case "city":
        formErrors.city = value.length < 2 ? "Minimum 2 characters required " : "";
        break
      case "postal_code":
        formErrors.postal_code = value.length < 4 ? "Minimum 4 characters required" : "";
        break;
      case "phone_no":
        formErrors.phone_no = numberRegex.test(value) ? "":"Phone no is not valid" ;
        break
      case "email":
        formErrors.email = emailRegex.test(value) ? "":"Email is not valid";
        break
      default:

    }

    if (name==="country"){
      switch(value) {
        case "Sri Lanka":
          this.setState({country_code:"+94"});
          break;
        case "Japan":
          this.setState({country_code:"+81"});
          break
        case "UK":
          this.setState({country_code:"+44"});
          break
        case "USA":
          this.setState({country_code:"+1"});
          break;
        case "German":
          this.setState({country_code:"+49"});
          break
        default:
      }
    }

    this.setState({
      formErrors,[name]:value
    },() => console.log(this.state))  ;
  };

  workspaceUpdate = (id) => {

    BaseService.get('/workspace/getsworkspace/',0,0,id)
      .then(res => {
        if(res && res.data && res.data["success"]){
          console.log(res.data["data"])

          this.setState(
            {
              id:res.data["data"][0]["id"],
              workspace_name:res.data["data"][0]["workspace_name"],
              is_active:res.data["data"][0]["is_active"],
              address_line1:res.data["data"][0]["address_line1"],
              address_line2:res.data["data"][0]["address_line2"],
              city:res.data["data"][0]["city"],
              postal_code:res.data["data"][0]["postal_code"],
              country_code:res.data["data"][0]["country_code"],
              phone_no:res.data["data"][0]["phone_no"],
              country:res.data["data"][0]["country"],
              email:res.data["data"][0]["email"],
              showUpdate: true
            })}
          // console.log(this.state)

        },err=>{
          alertify.alert("Cannot load the supplier");
        }

      );

  };

  workspaceShow = (id) => {

    BaseService.get('/supplier/getssupplier/',0,0,id)
      .then(res => {

        if(res && res.data && res.data["success"]) {
          console.log(res.data["data"])

          this.setState(
            {
              id: res.data["data"][0]["id"],
              workspace_name: res.data["data"][0]["workspace_name"],
              is_active: res.data["data"][0]["is_active"],
              address_line1: res.data["data"][0]["address_line1"],
              address_line2: res.data["data"][0]["address_line2"],
              city: res.data["data"][0]["city"],
              postal_code: res.data["data"][0]["postal_code"],
              country_code: res.data["data"][0]["country_code"],
              phone_no: res.data["data"][0]["phone_no"],
              country: res.data["data"][0]["country"],
              email: res.data["data"][0]["email"],
              show: true
            })
          // console.log(this.state)

        } },err=>{
          alertify.alert("Cannot load the supplier");
        }

      );

  };

  deleteRow = (id) => {

    const obj={
      id:id,
      is_delete:1,
    }
    let that = this;
    alertify.confirm("Do you want to delete? ", function (e) {
      if (e) {
        BaseService.post('/supplier/update/',obj)
          .then(res => {
              console.error(res)
              if (res && res.data && res.data["success"]) {
                alertify.success("Supplier delete succesfully !");
                that.componentDidMount()
              }

            }
            , err=>{
              alertify.alert("Cannot perform the operation");
            }
          );
      } else {
        // user clicked "cancel"
      }
    });
  };

  componentDidMount() {
    this.get_workspaces()
  };

  onClickPage=(current, pageSize)=>{

    this.setState({
      currentpage:current,
      pagesize:pageSize
    })

    BaseService.get('/workspace/get/',pageSize,current)
      .then(res => {
        if(res && res.data && res.data["success"]){
        console.log(res.data["data"])
        this.setState(
          {
            count:res.data["count"],
            isLoaded: true,
            workspaces: res.data["data"]
          }
        )

      }}, err => {
        alertify.alert("Cannot perform the operation");
      });

  };

  onShowSizeChange=(current, pageSize)=>{
    this.setState({
      currentpage:current,
      pagesize:pageSize
    })

    BaseService.get('/workspace/get/',pageSize,current)
      .then(res => {
        if(res.data && res.data["success"]){
        console.log(res.data["data"])
        this.setState(
          {
            count:res.data["count"],
            isLoaded: true,
            workspaces: res.data["data"]
          }
        )

      }}, err => {
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

    BaseService.post('/supplier/update/',obj)
      .then(res => {
          if(res && res.data && res.data["success"]){
            this.componentDidMount()
            alertify.success("Changed the status succesfully !");
          }
          else{
            alertify.alert("Cannot perform the operation");
          }

        },
        err=>{
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
        workspace_name: this.state.workspace_name,
        address_line1: this.state.address_line1,
        address_line2: this.state.address_line2,
        city: this.state.city,
        postal_code: this.state.postal_code,
        country_code: this.state.country_code,
        phone_no: this.state.phone_no,
        country: this.state.country,
        email: this.state.email,
      }

      BaseService.post('/workspace/update/', obj)
        .then(res => {
            if (res && res.data && res.data["success"]) {
              console.log(res)
              alertify.success("Supplier update succesfully !");
              this.componentDidMount()
              this.setState({
                id:'',
                workspace_name:'',
                is_active:'0',
                address_line1:'',
                address_line2:'',
                city:'',
                postal_code:'',
                country_code:'+94',
                phone_no:'',
                country:'Sri Lanka',
                email:'',
                showUpdate: false
              })
            }
          }, err => {
            alertify.alert("Cannot perform the operation");
          }
        )



    }
    else{
      alertify.error("Please fill the form properly !");
    }
  }

  onSubmitInsert=e=>{
    e.preventDefault();

    console.log('form is submit');

    if(formValid(this.state)) {
      const obj = {
        workspace_name: this.state.workspace_name,
        address_line1: this.state.address_line1,
        address_line2: this.state.address_line2,
        city: this.state.city,
        is_active: this.state.is_active,
        postal_code: this.state.postal_code,
        country_code: this.state.country_code,
        phone_no: this.state.phone_no,
        country: this.state.country,
        email: '',
      };

      BaseService.post('/workspace/save/', obj)
        .then(res => {
          if (res && res.data && res.data["success"]) {
            this.componentDidMount()
            alertify.success("Workspace insert succesfully !");
            this.setState({
              id: '',
              workspace_name: '',
              address_line1: '',
              address_line2: '',
              city: '',
              is_active: '0',
              postal_code: '',
              country_code: '+94',
              phone_no: '',
              country: 'Sri Lanka',
              email: '',
              showInsert: false
            })
          }
        }, err => {
          alertify.alert("Cannot perform the operation");
        })



    }
    else{
      alertify.error("Please fill the form properly !");
    }
  }

  render() {

    const {workspaces,formErrors} = this.state;

    return (
      <div className="animated fadeIn" style={{margin:'50px'}}>

        <button type="button" className="btn btn-outline-primary" onClick={(e) => this.setState({showInsert:true})}>Insert Workspace</button>

        <br/>
        <br/>

        <button type="button" className="btn btn-outline-primary" onClick={(e) => this.props.history.push('/superuser')}>Create User</button>

        <br/>
        <br/>


        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> Workspace List
          </CardHeader>
          <CardBody>
            <Table responsive>
              <thead>
              <tr>
                <th>Id</th>
                <th>Workspace Name</th>
                <th>Address Line1</th>
                <th>Address Line2</th>
                <th>City</th>
                <th>Country</th>
                <th>Postal Code</th>
                <th>Country Code</th>
                <th>Phone No</th>
                <th colSpan="2">Actions</th>
              </tr>
              </thead>

              {workspaces.map(workspace => (

                <tbody>
                <tr>
                  <td> {workspace.id} </td>
                  <td>{workspace.workspace_name}</td>
                  <td>{workspace.address_line1}</td>
                  <td>{workspace.address_line2}</td>
                  <td>{workspace.city}</td>
                  <td>{workspace.country}</td>
                  <td>{workspace.postal_code}</td>
                  <td>{workspace.country_code}</td>
                  <td>{workspace.phone_no}</td>

                  {/*<td>*/}
                  {/*  <div  style={{width:'50px'}}>*/}
                  {/*    <Switch checkedChildren="Active" unCheckedChildren="Deactive" defaultChecked checked={supplier.is_active} onChange={(e) => this.setStatus(supplier.id,supplier.is_active, e)}/>*/}
                  {/*  </div>*/}
                  {/*</td>*/}
                  <td>
                    <div  style={{width:'50px'}}>
                      <button disabled type="button" className="btn btn-outline-danger" onClick={(e) => this.deleteRow(workspace.id, e)}>Delete</button>
                    </div>
                  </td>
                  <td>
                    <div  style={{width:'50px'}}><button type="button" className="btn btn-outline-primary" onClick={(e) => this.workspaceUpdate(workspace.id, e)} >Update</button></div>

                  </td>

                  {/*<td>*/}
                  {/*  <div  style={{width:'50px'}}><button type="button" className="btn btn-outline-success" onClick={(e) => this.workspaceShow(supplier.id, e)} >View</button></div>*/}

                  {/*</td>*/}

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
            <ModalHeader toggle={this.toggleUpdate} >Workspace Update</ModalHeader>
            <ModalBody>
              <FormGroup row>
                <Col md="6">
                  <Label >Workspace Name</Label>
                  <Input required invalid={formErrors.workspace_name}  type="text" placeholder="Enter Workspace Name" value={this.state.workspace_name}
                         onChange={this.handleChange} name="workspace_name"/>
                  {formErrors.workspace_name.length > 0 && (
                    <FormFeedback className="help-block">{this.state.formErrors.workspace_name}</FormFeedback>
                  )}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="4">
                  <Label >Address Line 1</Label>
                  <Input required invalid={formErrors.address_line1}  type="text" placeholder="Enter Address Line 1" value={this.state.address_line1}
                         onChange={this.handleChange} name="address_line1"/>
                  {formErrors.address_line1.length > 0 && (
                    <FormFeedback className="help-block">{this.state.formErrors.address_line1}</FormFeedback>
                  )}
                </Col>
                <Col md="4">
                  <Label >Address Line 2</Label>
                  <Input required invalid={formErrors.address_line2}  type="text" placeholder="Enter Address Line 2"  value={this.state.address_line2}
                         onChange={this.handleChange} name="address_line2" />
                  {formErrors.address_line2.length > 0 && (
                    <FormFeedback className="help-block">{this.state.formErrors.address_line2}</FormFeedback>
                  )}
                </Col>
                <Col md="4">
                  <Label >City</Label>
                  <Input required invalid={formErrors.city}  type="text" placeholder="Enter City"  value={this.state.city}
                         onChange={this.handleChange} name="city" />
                  {formErrors.city.length > 0 && (
                    <FormFeedback className="help-block">{this.state.formErrors.city}</FormFeedback>
                  )}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label >Country</Label>
                  <Input type="select"  value={this.state.country} onChange={this.handleChange}  name="country">
                    <option value="Sri Lanka"  >Sri Lanka</option>
                    <option value="Japan"  >Japan</option>
                    <option value="German"  >German</option>
                    <option value="UK"  >UK</option>
                    <option value="USA"  >USA</option>
                  </Input>

                </Col>
                <Col md="6">
                  <Label >Postal Code</Label>
                  <Input required invalid={formErrors.postal_code} type="text" placeholder="Enter Postal Code"  value={this.state.postal_code}
                         onChange={this.handleChange} name="postal_code" />
                  {formErrors.postal_code.length > 0 && (
                    <FormFeedback className="help-block">{this.state.formErrors.postal_code}</FormFeedback>
                  )}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label >Country Code</Label>
                  <Input disabled type="text" placeholder="Enter Country" value={this.state.country_code}
                         onChange={this.handleChange} name="country_code"/>
                </Col>
                <Col md="6">
                  <Label >Phone No</Label>
                  <Input required invalid={formErrors.phone_no}  type="text" placeholder="Enter Phone No"  value={this.state.phone_no}
                         onChange={this.handleChange} name="phone_no" />
                  {formErrors.phone_no.length > 0 && (
                    <FormFeedback className="help-block">{this.state.formErrors.phone_no}</FormFeedback>
                  )}
                </Col>
              </FormGroup>
              {/*<FormGroup >*/}

              {/*    <Label >E mail</Label>*/}
              {/*    <Input required invalid={formErrors.email}  type="text" placeholder="Enter E mail" value={this.state.email}*/}
              {/*           onChange={this.handleChange} name="email"/>*/}
              {/*  {formErrors.email.length > 0 && (*/}
              {/*    <FormFeedback className="help-block">{this.state.formErrors.email}</FormFeedback>*/}
              {/*  )}*/}

              {/*</FormGroup>*/}
            </ModalBody>
            <ModalFooter>
              <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o"></i> Submit</Button>
              <Button type="reset" size="sm" color="danger" onClick={this.toggleUpdate}><i className="fa fa-ban"></i> Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>

        <Modal isOpen={this.state.showInsert} toggle={this.toggleInsert}
               className={'modal-primary ' + this.props.className}>
          <Form onSubmit={this.onSubmitInsert} >
            <ModalHeader toggle={this.toggleInsert} >Workspace Insert</ModalHeader>
            <ModalBody>
              <FormGroup row>
                <Col md="6">
                  <Label >Workspace Name</Label>
                  <Input invalid={formErrors.workspace_name}  type="text" placeholder="Enter Workspace Name" value={this.state.workspace_name}
                         onChange={this.handleChange} name="workspace_name"/>
                  {formErrors.workspace_name.length > 0 && (
                    <FormFeedback className="help-block">{this.state.formErrors.workspace_name}</FormFeedback>
                  )}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="4">
                  <Label >Address Line 1</Label>
                  <Input invalid={formErrors.address_line1}  type="text" placeholder="Enter Address Line 1" value={this.state.address_line1}
                         onChange={this.handleChange} name="address_line1"/>
                  {formErrors.address_line1.length > 0 && (
                    <FormFeedback className="help-block">{this.state.formErrors.address_line1}</FormFeedback>
                  )}
                </Col>
                <Col md="4">
                  <Label >Address Line 2</Label>
                  <Input invalid={formErrors.address_line2}  type="text" placeholder="Enter Address Line 2"  value={this.state.address_line2}
                         onChange={this.handleChange} name="address_line2" />
                  {formErrors.address_line2.length > 0 && (
                    <FormFeedback className="help-block">{this.state.formErrors.address_line2}</FormFeedback>
                  )}
                </Col>
                <Col md="4">
                  <Label >City</Label>
                  <Input invalid={formErrors.city}  type="text" placeholder="Enter City"  value={this.state.city}
                         onChange={this.handleChange} name="city" />
                  {formErrors.city.length > 0 && (
                    <FormFeedback className="help-block">{this.state.formErrors.city}</FormFeedback>
                  )}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label >Country</Label>
                  <Input type="select"  value={this.state.country} onChange={this.handleChange}  name="country">
                    <option value="Sri Lanka"  >Sri Lanka</option>
                    <option value="Japan"  >Japan</option>
                    <option value="German"  >German</option>
                    <option value="UK"  >UK</option>
                    <option value="USA"  >USA</option>
                  </Input>
                </Col>
                <Col md="6">
                  <Label >Postal Code</Label>
                  <Input invalid={formErrors.postal_code}  type="text" placeholder="Enter Postal Code"  value={this.state.postal_code}
                         onChange={this.handleChange} name="postal_code" />
                  {formErrors.postal_code.length > 0 && (
                    <FormFeedback className="help-block">{this.state.formErrors.postal_code}</FormFeedback>
                  )}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label >Country Code</Label>
                  <Input disabled type="text" placeholder="Enter Country" value={this.state.country_code}
                         onChange={this.handleChange} name="country_code"/>
                </Col>
                <Col md="6">
                  <Label >Phone No</Label>
                  <Input invalid={formErrors.phone_no}  type="text" placeholder="Enter Phone No"  value={this.state.phone_no}
                         onChange={this.handleChange} name="phone_no" />
                  {formErrors.phone_no.length > 0 && (
                    <FormFeedback className="help-block">{this.state.formErrors.phone_no}</FormFeedback>
                  )}
                </Col>
              </FormGroup>
              {/*<FormGroup row>*/}
              {/*  <Col md="6">*/}
              {/*  <Label >E mail</Label>*/}
              {/*  <Input invalid={formErrors.email}  type="text" placeholder="Enter E mail" value={this.state.email}*/}
              {/*         onChange={this.handleChange} name="email"/>*/}
              {/*    {formErrors.email.length > 0 && (*/}
              {/*      <FormFeedback className="help-block">{this.state.formErrors.email}</FormFeedback>*/}
              {/*    )}*/}
              {/*  </Col>*/}
              {/*  <Col md="6">*/}
              {/*    <Label >Is supplier active?</Label>*/}
              {/*    <Input type="select"  value={this.state.is_active} onChange={this.handleChange}  name="is_active">*/}
              {/*      <option value="1"  >Yes</option>*/}
              {/*      <option value="0"  >No</option>*/}
              {/*    </Input>*/}
              {/*  </Col>*/}
              {/*</FormGroup>*/}
            </ModalBody>
            <ModalFooter>
              <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o"></i> Submit</Button>
              <Button type="reset" size="sm" color="danger" onClick={this.toggleInsert}><i className="fa fa-ban"></i> Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>

{/*        <Modal isOpen={this.state.show} toggle={this.toggleShow}*/}
{/*               className={'modal-primary ' + this.props.className}>*/}

{/*            <ModalHeader toggle={this.toggleShow} >Supplier View</ModalHeader>*/}
{/*            <ModalBody>*/}
{/*            <div>*/}
{/*              <Row>*/}
{/*              <Col md="6">*/}
{/*                  <Label >Supplier Name</Label>*/}
{/*                  <Input disabled type="text" value={this.state.supplier_name}*/}
{/*                         />*/}
{/*              </Col>*/}
{/*              <Col md="6">*/}
{/*                  <Label >Shop Name</Label>*/}
{/*                  <Input disabled type="text"   value={this.state.shop_name}*/}
{/*                          />*/}
{/*              </Col>*/}
{/*            </Row>*/}
{/*            </div>*/}
{/*<hr/>*/}
{/*              <div>*/}
{/*              <Row>*/}
{/*                <Col md="4">*/}

{/*                  <Label >Address Line 1</Label>*/}
{/*                  <Input disabled type="text"  value={this.state.address_line1}*/}
{/*                         />*/}
{/*                </Col>*/}
{/*                <Col md="4">*/}
{/*                  <Label >Address Line 2</Label>*/}
{/*                  <Input disabled type="text"   value={this.state.address_line2}*/}
{/*                          />*/}
{/*                </Col>*/}
{/*                <Col md="4">*/}
{/*                  <Label >City</Label>*/}
{/*                  <Input disabled type="text"   value={this.state.city}*/}
{/*                          />*/}
{/*                </Col>*/}
{/*              </Row>*/}
{/*              </div>*/}
{/*              <hr/>*/}
{/*              <div>*/}
{/*                <Row>*/}
{/*                  <Col md="6">*/}
{/*                  <Label >Country</Label>*/}
{/*                  <Input disabled type="text"  value={this.state.country}*/}
{/*                         />*/}
{/*                  </Col>*/}
{/*                  <Col md="6">*/}
{/*                  <Label >Postal Code</Label>*/}
{/*                  <Input disabled type="text"   value={this.state.postal_code}*/}
{/*                          />*/}
{/*                  </Col>*/}

{/*                </Row>*/}
{/*              </div>*/}
{/*              <hr/>*/}
{/*              <div>*/}
{/*                <Row>*/}
{/*                  <Col md="6">*/}
{/*                  <Label >Country Code</Label>*/}
{/*                  <Input disabled type="text"  value={this.state.country_code}*/}
{/*                         />*/}
{/*                  </Col>*/}
{/*                  <Col md="6">*/}
{/*                  <Label >Phone No</Label>*/}
{/*                  <Input disabled type="text"   value={this.state.phone_no}*/}
{/*                          />*/}
{/*                  </Col>*/}
{/*                </Row>*/}
{/*              </div>*/}
{/*              <hr/>*/}
{/*              <div>*/}
{/*                <Row>*/}
{/*                  <Col md="6">*/}
{/*                  <Label >E mail</Label>*/}
{/*                  <Input disabled type="text"  value={this.state.email}*/}
{/*                         />*/}
{/*                  </Col>*/}
{/*                  <Col md="6">*/}

{/*                  </Col>*/}
{/*                </Row>*/}
{/*              </div>*/}

{/*            </ModalBody>*/}
{/*            <ModalFooter>*/}
{/*              <Button type="reset" size="sm" color="danger" onClick={this.toggleShow}><i className="fa fa-ban"></i> Close</Button>*/}
{/*            </ModalFooter>*/}
{/*        </Modal>*/}


      </div>

    );
  }
}

export default Workspace;
