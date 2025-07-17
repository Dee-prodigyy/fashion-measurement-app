import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import AuthToggle from '../components/AuthToggle';

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => setIsLogin(!isLogin);

  const handleLogin = (data) => {
    console.log('Logging in with:', data);
    // TODO: Handle login API call
  };

  const handleRegister = (data) => {
    console.log('Registering with:', data);
    // TODO: Handle register API call
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          {isLogin ? 'Sign in to your account or create a new one' : 'Create a new account or sign in if you already have one'}
        </p>

        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l-md ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button
            className={`px-4 py-2 rounded-r-md ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <RegisterForm onRegister={handleRegister} />
        )}

        <AuthToggle isLogin={isLogin} onToggle={handleToggle} />
      </div>
    </div>
  );
}
