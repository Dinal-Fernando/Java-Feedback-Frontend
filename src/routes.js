import React from 'react';


const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Feedback = React.lazy(() => import('./views/Components/Feedback/Feedback'));

const Error = React.lazy(() => import('./views/Pages/Page404/Page404'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home'},
  { path: '/profile', name: 'Profile', component: Dashboard },
  { path: '/generate_feedback', exact: true,  name: 'Generate Feedback', component: Feedback },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
