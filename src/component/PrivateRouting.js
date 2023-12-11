
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserAuth } from '../context/authcontext';

const PrivateRoute = ({ path, element }) => {
  const { user } = UserAuth();

  return (
    <Route
      path={path}
      element={user ? element : <Navigate to="/" replace />}
    />
  );
};


export default PrivateRoute;


