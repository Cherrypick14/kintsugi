import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';


const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const authClient = await AuthClient.create();
      const identity = await authClient.login({
        onSuccess: () => {
          // Perform actions upon successful login
          window.localStorage.setItem('identity', JSON.stringify(authClient.getIdentity()));
          navigate('/admin');
        }
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
    <div>
      <button onClick={handleLogin}>Login with Internet Identity</button>
    </div>
    
    </>
    
  );
};

export default Login;
