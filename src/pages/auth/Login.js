import React from 'react';
import LoginBanner from '../../components/LoginBanner';
import LoginForm from '../../components/LoginForm';

const Login = () => {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <LoginBanner />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
