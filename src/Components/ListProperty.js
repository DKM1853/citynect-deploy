import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./ListProperty.css";
import Step2 from "./ListProperty/step2";
import Step3 from "./ListProperty/step3";
import Step4 from "./ListProperty/step4";
import LoginModal from './Login.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
const ListProperty = ({user}) => {
  const Navigate = useNavigate();
  useEffect(()=>{
    const loggedInUser = localStorage.getItem('user')
    if(!loggedInUser){
      setLoginmodal(true)
    }
    // eslint-disable-next-line
  },[])
  const [currentStep, setCurrentStep] = useState(1);
  const [loginmodal, setLoginmodal] = useState(false);
  const loginModal = () => {
    if (!user) { 
      Navigate('/'); // Navigate to the home page when closing the modal without logging in
    }else{
      setLoginmodal(false);
    }
  };
  const [propertyDetails, setPropertyDetails] = useState({
    ownerId: user ? user.id : null,
    name: "", 
    phone: "",
    type: "",
    subtype: "",
    bedroom:0,
    bathroom:0,
    sharing:"",
    withoutFood:0,
    memberedAllowed:"",
    currentlyLiving:0,
    vacancyAvailable:0,
    nonVegAllowed:0,
    furnishedType:"",
    amenities:[],
    availableFrom:Date.now(),
    rent:"",
    totalFlatRent:"",
    rentEachHead:"",
    isNegotiable:false,
    deposit:"",
    instructions:"",
    preference:"",
    photoUrls:[],
    additionalCosts: {
      description1:"",
      cost1:"",
      description2:"",
      cost2:"",
      description3:"",
      cost3:"",
    },
    address:{
      houseno:"",
      area:"",
      pincode:"",
      streetAddress:"",
      link:"",
      latitude:"",
      logitude:""
    },  
    isVerified: 0,
    isRentedout: 0,
    isDeleted: 0,
    isReported: 0,
  });
  const updatePropertyDetails = (newDetails) => {
    setPropertyDetails(newDetails);
  };
  const onChange = (value, field) => {
    setPropertyDetails({
      ...propertyDetails,
      [field]: value,
    });
    if (errors.name === field) {     
      setErrors({
        name:"",
        error:""
      });
    }
  };
  const handleInputChange = (e) => {
    setPropertyDetails({
      ...propertyDetails,
      [e.target.name]: e.target.value,
    });
  };
  const radioButtons = [
    { value: "pg", label: "PG" },
    { value: "sharing flat", label: "Sharing Flat" },
    { value: "private flat", label: "Private Flat" },
  ];
  const radioButtonSubtype = [
    { value: "Flat", label: "Flat" },
    { value: "Studio Apartment", label: "Studio Apartment" },
    { value: "Independent House/Villa", label: "Independent House/Villa" },
  ];

  const [errors, setErrors] = useState({
    name:"",
    error:""
  });
  const validateForm = () => {
    const newErrors = {};
    if (!propertyDetails.phone) {
      newErrors.name = 'phone'
      newErrors.error = 'Phone number is required.';
    } else if (propertyDetails.phone.length !== 10) {
      newErrors.name = 'phone'
      newErrors.error = 'Phone number must be 10 digits.';
    }
    if (!propertyDetails.name) {
      newErrors.name = 'name'
      newErrors.error = 'Owner name is required.';
    }
    if (!propertyDetails.subtype) {
      newErrors.name = 'subtype'
      newErrors.error = 'Please select a property type.';
    }
    if (!propertyDetails.type) {
      newErrors.name = 'type'
      newErrors.error = 'Please select a category.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleNextClick = () => {
    const isValid = validateForm();
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  return (
    <div className="MainForListProperty" style={{overflowX:"hidden"}}>
      {currentStep === 1 && (
        <div className="row justify-content-center">
          <div className="col-lg-5 m-5">
            <h3> Rent Your Property Now with just 3 Easy steps !!!</h3>
            <img src="" alt="" />
          </div>
          <div className="col-lg-3" id="formBox">
            <h3 className="mb-4 text-center">Let's start</h3>
            <Form>
              <FormGroup>
                <Label id="labelforMobileView"style={{ fontWeight: "500" }}>Select category :</Label>
                <div className="radio-groups">
                  {radioButtons.map((button) => (
                    <div
                      key={button.value}
                      className={`radio-button rounded-pill ${
                        propertyDetails.type === button.value ? "selected" : ""
                      }`}
                      onClick={() => onChange(button.value, "type")}
                    >
                      {button.label}
                    </div>
                  ))}
                </div>
                {errors.name==="type" && <div className="error-message text-danger">{errors.error}</div>}
              </FormGroup>
              <FormGroup>
                <Label id="labelforMobileView"style={{ fontWeight: "500" }}>Type of property :</Label>
                <div className="radio-groups">
                  {radioButtonSubtype.map((button) => (
                    <div
                      key={button.value} 
                      className={`radio-button rounded-pill ${
                        propertyDetails.subtype === button.value
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => onChange(button.value, "subtype")}
                    >
                      {button.label}
                    </div>
                  ))}
                </div>
                {errors.name==="subtype" && <div className="error-message text-danger">{errors.error}</div>}
              </FormGroup>
              <FormGroup>
                <Label id="labelforMobileView"> Owner Details :</Label>
                <Input
                  type="text"
                  value={propertyDetails.name}
                  onChange={handleInputChange}
                  name="name"
                  id="name"
                  placeholder="Owner Name"
                />
               {errors.name==="name" && <div className="error-message text-danger">{errors.error}</div>}
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  value={propertyDetails.phone}
                  onChange={handleInputChange}
                  name="phone"
                  id="phone"
                  placeholder="Owner Phone Number"
                  maxLength={10}
                  minLength={10}
                />
                {/* to add icons before this  */} 
                {errors.name==="phone" && <div className="error-message text-danger">{errors.error}</div>}
              </FormGroup>
              <FormGroup>
                <Button style={{ width: "100%", backgroundColor: "#287DFD",border:"none",height:"40px" }} onClick={handleNextClick}>
                  Next <FontAwesomeIcon icon={faArrowRight}/>
                </Button>
              </FormGroup>
            </Form>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <Step2
          propertyDetails={propertyDetails}
          updatePropertyDetails={updatePropertyDetails}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          handleInputChange={handleInputChange}
        />
      )}
      {currentStep === 3 && (
        <Step3
          propertyDetails={propertyDetails}
          updatePropertyDetails={updatePropertyDetails}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          handleInputChange={handleInputChange}
        />
      )}
      {currentStep === 4 && (
        <Step4
          propertyDetails={propertyDetails}
          updatePropertyDetails={updatePropertyDetails}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          handleInputChange={handleInputChange}
        />
      )}
       <LoginModal isOpen={loginmodal} onClose={loginModal} />
       
    </div>
  );
};

export default ListProperty;
