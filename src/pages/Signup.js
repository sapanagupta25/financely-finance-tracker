import React from 'react'
import Header from '../components/Header';
import SignupSigninComponent from '../components/SignupSignin';

const signup = () => {
  return (
    <div>
    <Header />
    <div className="wrapper">
      <SignupSigninComponent/>
    </div>
    </div>
  )
}

export default signup;
