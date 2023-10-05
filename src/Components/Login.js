import React, { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import {  Input } from 'reactstrap';
import { Form, FormGroup, FormText } from 'react-bootstrap';
const Login = ({ isOpen, onClose }) => {
  const [user,setUser] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState('');
  const [error ,setError] = useState(false);
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const sendOtp =async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_IP}/user/login`, {
        method: 'POST',
        body: JSON.stringify({number: phoneNumber }), // Convert object to JSON string
        headers: {
          'Content-Type': 'application/json' // Set the correct content type for JSON
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data) // Handle the API response here
        setOtpSent("success")
        console.log(data)
      } else {
        console.error('Failed to submit property:', response.status);
        setError("Number is not Registered");
        // setError(response.error);
      }
    } catch (error) {
      console.error('Error submitting property:', error);
      setError("Internal Server Error");
    }
  }
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleLogin = async() => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_IP}/user/verify-otp`, {
        method: 'POST',
        body: JSON.stringify({ number:phoneNumber,otp:otp}), // Convert object to JSON string
        headers: {
          'Content-Type': 'application/json' // Set the correct content type for JSON
        }
      });
      if (response.ok) {
        localStorage.setItem('user',user.id)
        window.location.reload()
      } else {
        console.error( response.status);
        setError("Invalid Otp ")
      }
    } catch (error) {
      console.error( error);
    }
  };

  const resendOtp =async()=>{
    try {
      const response = await fetch(`${process.env.REACT_APP_API_IP}/user/resend-otp`, {
        method: 'POST',
        body: JSON.stringify({number: phoneNumber }), // Convert object to JSON string
        headers: {
          'Content-Type': 'application/json' // Set the correct content type for JSON
        }
      });
      if (response.ok) {
        setOtp('')
        setError(false)
      } else {
        console.error('Failed to submit property:', response.status);
      }
    } catch (error) {
      console.error('Error submitting property:', error);
    }
  }
  return (
    <div className={`login-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <Form>
          <div className='titleBox d-flex flex-column'>
          <div className='closeBox'><span className="close" onClick={onClose}><FontAwesomeIcon icon={faClose}/></span></div>
              <div className="d-flex justify-content-center"><h4>Welcome Back !</h4></div>
              <span className='subheading'>Hey, Enter Your details to get sign in to your account </span>
          </div>
          <div className='inputBox'>
            <FormGroup>
              <Input
                type="number"
                id="phoneNumber"
                required
                placeholder='Phone'
                maxLength={10}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                />
            </FormGroup>
            {otpSent && <FormGroup>
              <Input
                type="number"
                id="otp"
                value={otp}
                placeholder='OTP'
                onChange={handleOtpChange}
                />
                <FormText className='formtext'>
                    <div>Didn't receive code? <span role='button' onClick={resendOtp} className='text-primary'>Send Again</span></div>
                </FormText>
            </FormGroup>}
            {error && <div className='text-danger'>{error}</div>}
              { !otpSent ?<button type="submit" className='mt-4 sm-mt-3' onClick={sendOtp}><b> Send OTP</b></button>:
              <button className='mt-4' type="button" onClick={handleLogin}>Login</button>}
              
              <div className='d-flex flex-row-reverse'><a href="https://wa.me/9316066832" className='float-right text-decoration-none text-dark' style={{opacity: ".7",fontSize:"13px"}}>Need Help?</a></div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
