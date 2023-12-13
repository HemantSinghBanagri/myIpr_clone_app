import React, { useState } from 'react';
import { UserAuth } from '../../../context/authcontext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import "./login.scss";
import Footer from './footer_logo';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { loginUser } = UserAuth();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const {  token } = await loginUser(email, password);

      Cookies.set('jwt', token, { secure: true, sameSite: 'None', httpOnly: true });
      navigate('/home');
    } catch (e) {
      if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('An error occurred during login. Please try again later.');
      }
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className='form-container'>
        <div className='form-input'>
          <label htmlFor="email">Email or Username</label>
          <input
            className="main"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
            placeholder='Enter your email or username'
            required
          />
        </div>
        <div className='form-input'>
          <label htmlFor="password">Password</label>
          <div className='password-input'>
            <input
              className="main"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='off'
              placeholder='Enter your password'
              required
            />
            <div className='eye-icon' onClick={() => setShowPassword(!showPassword)}>
              <RemoveRedEyeIcon />
            </div>
          </div>
        </div>
        {error && <div style={{ color: "red" }} className='error-message'>{error}</div>}
        <span className='forgot'>
          <a href='/reset'>Forget Password</a>
        </span>

        <div className='button-wrapper'>
          <button type="submit" className='main1 second-color' disabled={loading}>
            {loading ? <RotateLeftIcon className='spinner'/> : 'Login'}
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default Login;
