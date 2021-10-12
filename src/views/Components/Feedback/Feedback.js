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
import Widget02 from './Widget02';
import Swal from "sweetalert2";


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

class Feedback extends Component {

  constructor(props,context){
    super(props,context);
    this.state={
      spinner:false,
      code:"",
      header_lines:[],
      class_lines:[],
      class_feedback:[],
      function_lines:[],
      function_feedback:[],
      main_func_lines:[],
      main_func_feedback:[],
      variables_and_types:[],
      variables_and_values:[],
    }

  }

  componentDidMount() {
    BaseService.get('/user/get_feedback/')
      .then(res => {
          if (res.data && res) {
            if (res.data["status"]===100) {
              alertify.success("Load Successful !");
              const data_obj=res.data["data"];
              this.setState({
                code:data_obj["code"],
                header_lines:data_obj["header_lines"],
                class_lines:data_obj["class"]["class_lines"],
                class_feedback:data_obj["class"]["class_feedback"],
                function_lines:data_obj["function"]["function_lines"],
                function_feedback:data_obj["function"]["function_feedback"],
                main_func_lines:data_obj["main_func"]["main_func_lines"],
                main_func_feedback:data_obj["main_func"]["main_func_feedback"],
                variables_and_types:data_obj["variables_and_types"],
                variables_and_values:data_obj["variables_and_values"],
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
        }, err => {
          alertify.alert("Cannot load");
        }
      );
  };




  render() {

    const {code,header_lines,class_lines,class_feedback,function_lines,function_feedback,main_func_lines,main_func_feedback,variables_and_types,variables_and_values} = this.state;

    return (
      <div className="animated fadeIn">

        <button type="button" className="btn btn-outline-primary" onClick={(e) => this.props.history.push('/profile')}>Add Sourcecode</button>

        <br/>
        <br/>


        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> Feedback
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

            {/*##################################### Header Lines ##############################################*/}
            {header_lines.length>0?(

                <div>
                  <h4>Header Lines</h4>
                  {
                    header_lines.map((line,index)=>(
                      <p><span style={{fontWeight:"bold"}}>{index}</span><span> </span>{line}</p>
                    ))
                  }
                </div>

              ):null
            }

            <hr style={{color: "#000", backgroundColor:"#000", height: 1}}/>

            {/*##################################### Class Lines ##############################################*/}
                {class_lines.length>0?(

                  <div>
                    <h4>Class</h4>
                    {
                      class_lines.map((line,index)=>(
                        <p><span style={{fontWeight:"bold"}}>{index}</span><span> </span>{line}</p>
                      ))
                    }

                    {class_feedback.length>0?(
                      <Table responsive>
                        <thead>
                        <tr>
                          <th>Line</th>
                          <th>Error</th>
                        </tr>
                        </thead>
                        {class_feedback.map(feedback => (
                          <tbody>
                          <tr>
                            <td> {feedback.line} </td>
                            <td>{feedback.error}</td>
                          </tr>
                          </tbody>
                        ))}
                      </Table>
                    ):null
                    }
              </div>

            ):null
            }


            <hr style={{color: "#000", backgroundColor:"#000", height: 1}}/>

            {/*##################################### Function Lines ##############################################*/}

            {function_lines.length>0?(

              <div>
                <h4>Function</h4>
                {
                  function_lines.map((line,index)=>(
                    <p><span style={{fontWeight:"bold"}}>{index}</span><span> </span>{line}</p>
                  ))
                }

                {function_feedback.length>0?(
                  <Table responsive>
                    <thead>
                    <tr>
                      <th>Line</th>
                      <th>Error</th>
                    </tr>
                    </thead>
                    {function_feedback.map(feedback => (
                      <tbody>
                      <tr>
                        <td> {feedback.line} </td>
                        <td>{feedback.error}</td>
                      </tr>
                      </tbody>
                    ))}
                  </Table>
                ):null
                }
              </div>

            ):null
            }

            <hr style={{color: "#000", backgroundColor:"#000", height: 1}}/>

            {/*##################################### Main Function Statements ##############################################*/}

            {main_func_lines.length>0?(

              <div>
                <h4>Main Function Statements</h4>
                {
                  main_func_lines.map((line,index)=>(
                    <p><span style={{fontWeight:"bold"}}>{index}</span><span> </span>{line}</p>
                  ))
                }

                {main_func_feedback.length>0?(
                  <Table responsive>
                    <thead>
                    <tr>
                      <th>Line</th>
                      <th>Error</th>
                    </tr>
                    </thead>
                    {main_func_feedback.map(feedback => (
                      <tbody>
                      <tr>
                        <td> {feedback.line} </td>
                        <td>{feedback.error}</td>
                      </tr>
                      </tbody>
                    ))}
                  </Table>
                ):null
                }
              </div>

            ):null
            }

            <hr style={{color: "#000", backgroundColor:"#000", height: 1}}/>
            {/*##################################### Variables with Data Types ##############################################*/}

            {variables_and_types.length>0?(

              <div>
                <h4>Variables And Data Types</h4>

                {variables_and_types.length>0?(
                  <Table responsive>
                    <thead>
                    <tr>
                      <th>Variable</th>
                      <th>Data Type</th>
                    </tr>
                    </thead>
                    {variables_and_types.map(type => (
                      <tbody>
                      <tr>
                        <td> {type.var} </td>
                        <td>{type.d_type}</td>
                      </tr>
                      </tbody>
                    ))}
                  </Table>
                ):null
                }
              </div>

            ):null
            }

            <hr style={{color: "#000", backgroundColor:"#000", height: 1}}/>
            {/*##################################### Variables with Values ##############################################*/}

            {variables_and_values.length>0?(

              <div>
                <h4>Variables And values</h4>

                {variables_and_values.length>0?(
                  <Table responsive>
                    <thead>
                    <tr>
                      <th>Variable</th>
                      <th>Value</th>
                    </tr>
                    </thead>
                    {variables_and_values.map(value => (
                      <tbody>
                      <tr>
                        <td> {value.var} </td>
                        <td>{value.value}</td>
                      </tr>
                      </tbody>
                    ))}
                  </Table>
                ):null
                }
              </div>

            ):null
            }




          </CardBody>
        </Card>

      </div>

    );
  }
}

export default Feedback;
