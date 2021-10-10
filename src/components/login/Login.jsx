import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import "./login.css";
function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    const signIn = e => {
        e.preventDefault()

        //firebase login
        auth.signInWithEmailAndPassword(email,password)
        .then(auth => {
            history.push('/')
        })
        .catch(error => alert(error.message))
    }

    const Register = e =>{
        e.preventDefault()

        //fire up firebase registration
        auth.createUserWithEmailAndPassword(email,password)
        .then((auth) => {
            if(auth){
                history.push('/')
            }
        })
        .catch(error => alert(error.message))
    }
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://governmentjobswork.com/wp-content/uploads/2020/10/Amazon-Jobs.png"
          alt=""
        />
      </Link>
      <div className="login_container">
        <h1>Sign In</h1>
        <form>
          <h5>Email</h5>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
          <h5>Password</h5>
          <input type="password" value={password} onChange={e => setpassword(e.target.value)} />
          <button onClick={signIn} tpye="submit" className="login-signIn-button" type="submit">Sign In</button>
        </form>
        <p>
          By signing-in you agree to Amazon's Terms and Conditions of Use &
          Sale. Please see our Privacy Policy, our Cookies Notice and our
          Interest-Based Ads.
        </p>

        <button onClick={Register} tpye="submit" className='login-register-button'>Create Your Amazon Account</button>
        </div>
      </div>
  );
}

export default Login;
