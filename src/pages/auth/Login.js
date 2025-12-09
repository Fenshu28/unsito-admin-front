import React from 'react';
import LoginBanner from '../../components/LoginBanner';
import LoginForm from '../../components/LoginForm';

const Login = () => {
  return (
    <div className="relative p-6 bg-white z-1 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row sm:p-0">
        <LoginForm />
        <LoginBanner />
      </div>
    </div>
  );
};

export default Login;
