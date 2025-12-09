import React from 'react';
import LoginBanner from '../../components/LoginBanner';
import LoginForm from '../../components/LoginForm';

const Login = () => {
  return (
    <div className="relative flex h-screen overflow-hidden bg-white">
      <LoginBanner />
      <LoginForm />
    </div>
  );
};

export default Login;
