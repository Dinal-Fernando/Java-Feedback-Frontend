import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

import sliit_logo from '../../assets/img/brand/sliit_logo.png'

import logout from '../../assets/img/brand/logout.jpg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src:sliit_logo , width: 150, height: 50, alt: 'SLIIT Logo' }}
          minimized={{ src: sliit_logo, width: 50, height: 50, alt: 'SLIIT Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/profile" className="nav-link" >Profile</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/generate_feedback" className="nav-link">Generate Feedback</Link>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          {/*<NavItem className="d-md-down-none">*/}
          {/*  <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>*/}
          {/*</NavItem>*/}
          {/*<NavItem className="d-md-down-none">*/}
          {/*  <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>*/}
          {/*</NavItem>*/}
          {/*<NavItem className="d-md-down-none">*/}
          {/*  <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>*/}
          {/*</NavItem>*/}
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav onClick={e => this.props.logout(e)}>
              <i className="fa fa-lock"></i>Logout
            </DropdownToggle>
            <DropdownMenu right>
              {/*<DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>*/}
              {/*<DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>*/}
              {/*<DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>*/}
              {/*<DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>*/}
              {/*<DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>*/}
              {/*<DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>*/}
              {/*<DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>*/}
              {/*<DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>*/}
              {/*<DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>*/}
              {/*<DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>*/}
              {/*<DropdownItem divider />*/}
              {/*<DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>*/}
              {/*<DropdownMenu right style={{ right: "auto" }}>*/}
              {/*  <DropdownItem onClick={e => this.props.logout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>*/}
              {/*</DropdownMenu>*/}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-md-down-none" />*/}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
