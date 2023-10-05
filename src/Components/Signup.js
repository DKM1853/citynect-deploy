import React, { useState } from 'react';
import './Signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Button, Input } from 'reactstrap';
import { Form, FormGroup, FormText, Image } from 'react-bootstrap';
import {auth,provider} from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useEffect } from 'react';
const Signup = ({ isOpen, onClose ,}) => {
  const [googleUser,setGoogleUser] = useState(false);
  useEffect(()=>{
    const userId  = (localStorage.getItem('user'))
    if (userId) {   
      fetch(`${process.env.REACT_APP_API_IP}/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
       })
       .catch((err) => console.log(err));
    }
    if(user.isVerified === 0){
      setGoogleUser(true)
    }
    // eslint-disable-next-line
  },[isOpen])
  const handleGoogleSignIn = async () => {
    try {
      signInWithPopup(auth, provider).then( async(result)=>{
        const user = result.user;
        setGoogleUser(user);
        const response = await fetch(`${process.env.REACT_APP_API_IP}/user/google-signin`, {
          method: 'POST',
          body: JSON.stringify({ name: user.displayName, email: user.email,uid:user.uid }), // Convert object to JSON string
          headers: {
            'Content-Type': 'application/json' // Set the correct content type for JSON
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data)
          localStorage.setItem("user",data.id) 
        } else {
          setError("User aleardy existes")
        }
      }).catch((err)=>{
        console.log(err);
      })
    } catch (error) {
      console.error(error);
    }
    
  };
  const [user,setUser] = useState({});
  const [error,setError] = useState();
  const [name,setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState('');
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handlenameChange = (e) => {
    setName(e.target.value);
  };
  const sendOtp =async()=>{
    if (googleUser) {
      try {
        const userId  = (localStorage.getItem('user'))
        const response = await fetch(`${process.env.REACT_APP_API_IP}/user/google-user`, {
          method: 'POST', // Convert object to JSON string},
          body: JSON.stringify({ name: name, number: phoneNumber,id:userId}), // Convert object to JSON string
          headers: {
            'Content-Type': 'application/json' // Set the correct content type for JSON
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setUser(data)// Handle the API response here
          setOtpSent("success")
        } else {
          setError(response.error)
        }
      } catch (error) {
        setError(error);
      }
    }else{
      try {
        const response = await fetch(`${process.env.REACT_APP_API_IP}/user/register`, {
          method: 'POST', // Convert object to JSON string},
          body: JSON.stringify({ name: name, number: phoneNumber  }), // Convert object to JSON string
          headers: {
            'Content-Type': 'application/json' // Set the correct content type for JSON
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setUser(data)// Handle the API response here
          setOtpSent("success")
        } else {
          setError(response.error)
        }
      } catch (error) {
        setError(error);
      }
    }
  }
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSignup = async() => {
    if(user.otp === otp){
    try {
      const response = await fetch(`${process.env.REACT_APP_API_IP}/user/verify-otp`, {
        method: 'POST',
        body: JSON.stringify({ otp: otp, number: phoneNumber }), // Convert object to JSON string
        headers: {
          'Content-Type': 'application/json' // Set the correct content type for JSON
        }
      });
      if (response.ok) {
        localStorage.setItem('user',user.id)
        window.location.reload()
      } else {
        setError(error)
      }
    } catch (error) {
      console.error( error);
    }
    }else{
      setError('Invalid Otp')
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
    <div className={`signup-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <Form>
          <div className='titleBox d-flex flex-column'>
          <div className='closeBox'><span className="close" onClick={onClose}><FontAwesomeIcon icon={faClose}/></span></div>
              <div className="d-flex justify-content-center">
               {  googleUser ?
                <h4>Complete Your Profile !</h4>:
                <h4>Create Your Account </h4>
                }
              </div>
              {
                googleUser?
                <span className='subheading'>Verify your mobile number to continue your search </span>:
                <span className='subheading'>Hey, Enter Your details to get sign in to your account </span>
              }
          </div>
          <div className='inputBox'>
            <FormGroup>
              <Input
                type="text"
                id="name"
                required
                placeholder='Name'
                value={googleUser?googleUser.displayName:name}
                onChange={handlenameChange}
                />
            </FormGroup>
            <FormGroup>
              <Input
                type="number"
                id="phoneNumber"
                required
                name='phoneNumber'
                placeholder='Phone'
                maxLength={10}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                />
            </FormGroup>
            {otpSent==="error" && 
                <FormText className='formtext text-danger'>
                   Error in sending data
                </FormText>
            }
            
            {otpSent==="success" && <FormGroup>
              <Input
                type="text"
                id="otp"
                value={otp}
                name='otp'
                placeholder='OTP'
                onChange={handleOtpChange}
                />
                <FormText className='formtext'>
                    <div>Didn't receive code? <span className='text-primary' onClick={resendOtp}>Send Again</span></div>
                </FormText>
                
            </FormGroup>}
            {error && 
                <FormText className='formtext text-danger'>
                   {error}
                </FormText>
            }
              { otpSent!=="success" ?<button type="button" className='mt-4 sm-mt-3' onClick={sendOtp}><b> Send OTP</b></button>:
              <button className='mt-4' type="button" onClick={handleSignup}>Signup</button>}
              { !googleUser &&
              <>
              <div className='text-center mt-3' style={{fontSize:"13px",fontWeight:"500"}}>  Or register with </div>
                <div className='d-flex mt-3'>
                  <Button className='me-1 brandBtn' onClick={handleGoogleSignIn}><Image src="./emenities/google.png"/><b> Google</b></Button>
                </div>
                </>
              }
             <div className='d-flex flex-row-reverse'><a href="https://wa.me/9316066832" className='float-right text-decoration-none text-dark' style={{opacity: ".7",fontSize:"13px"}}>Need Help?</a></div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;

