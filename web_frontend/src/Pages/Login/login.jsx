import React from 'react';
import './login.css'; // Import the CSS file
import { assets } from '../../assets/assets';

function Login() {
  return (
    <div className="login-container">
      {/* Left side with Image */}
      <div className="login-image">
        <img src={assets.signup_login} alt="Login" />
      </div>

      {/* Right side with Login Form */}
      <div className="login-form">
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" required />
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;