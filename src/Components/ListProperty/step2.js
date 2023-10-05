import React from "react";
import "../ListProperty.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Button, FormGroup, Label } from "reactstrap";
import { useState } from "react";
const Step2 = ({
  propertyDetails,
  updatePropertyDetails,
  currentStep,
  setCurrentStep,
  handleInputChange,
}) => {
  const [errors,setErrors] = useState({
    name:"",
    error:""
  });
  const onChange = (value, field) => {
    const newDetails = { ...propertyDetails, [field]: value };
    updatePropertyDetails(newDetails);
    if (errors.name === field) {     
      setErrors({
        name:"",
        error:""
      });
    }
  };
  const toggleCheckbox = (value) => {
    const isSelected = propertyDetails.amenities.includes(value);
    let updatedSelections;
    if (isSelected) {
      updatedSelections = propertyDetails.amenities.filter(
        (item) => item !== value
      );
    } else {
      updatedSelections = [...propertyDetails.amenities, value];
    }
    const newDetails = { ...propertyDetails, amenities: updatedSelections };
    updatePropertyDetails(newDetails);
    if (propertyDetails.amenities.length !== 0) {     
      setErrors({
        name:"",
        error:""
      });
    }else{
      setErrors({
        name:"amenities",
        error:"Please select at least 2 amenity."
      });
    }
  };
  const bedrooms = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
  ];
  const sharings = [
    { value: "1", label: "Single Sharing" },
    { value: "2", label: "2 Sharing" },
    { value: "3", label: "3 Sharing" },
    { value: "4+", label: "4 or more" },
  ];
  const memberedAllowed = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "both", label: "Both" },
  ];
  const yesno = [
    { value: 1, label: "Yes" },
    { value: 0, label: "No" },
  ];
  const amenities = [
    { value: "electricity", label: "Electricity" },
    { value: "tv", label: "T.V." },
    { value: "2-wheeler-parking", label: "2 Wheeler Parking" },
    { value: "free-wifi", label: "Free Wifi" },
    { value: "cooking", label: "Cooking" },
    { value: "house-keeping", label: "House Keeping" },
    { value: "laundry", label: "Laundry" },
    { value: "fridge", label: "Fridge" },
    { value: "ro-water", label: "RO Water" },
    { value: "24*7-water", label: "24*7 Water" },
    { value: "air-conditioner", label: "Air conditioner" },
    { value: "breakfast", label: "Breakfast" },
    { value: "gyser", label: "Gyser" },
    { value: "lunch", label: "Lunch" },
    { value: "security", label: "Security" },
    { value: "microwave", label: "Microwave" },
    { value: "fans", label: "Fans" },
    { value: "wardrobe", label: "Wardrobe" },
    { value: "cctv", label: "CCTV" },
  ];
  const furnishedType = [
    { value: "fully-furnished", label: "Fully-furnished" },
    { value: "semi-furnished", label: "Semi-furnished" },
    { value: "unfurnished", label: "Un-furnished" },
  ];
  const validateForm = () => {
    const newErrors = {};
    if (propertyDetails.amenities.length === 0) {
      newErrors.name = 'amenities'
      newErrors.error = 'Please select at least 2 amenity.';
    }
    
    if (!propertyDetails.furnishedType) {
      newErrors.name = 'furnishedType'
      newErrors.error = 'Please select the furnished type.';
    }
    if (propertyDetails.nonVegAllowed === null) {
      newErrors.name = 'nonVegAllowed'
      newErrors.error = 'Please select whether non-veg is allowed.';
    }
    if (propertyDetails.type === "sharing flat") {
      if (!propertyDetails.currentlyLiving) {
        newErrors.name = 'currentlyLiving'
        newErrors.error = 'Please select the currently living option.';
      }

      if (!propertyDetails.vacancyAvailable) {
        newErrors.name = 'vacancyAvailable'
        newErrors.error = 'Please select the number of vacancies available.';
      }
    }
    if(propertyDetails.type === "pg"){

      if (!propertyDetails.sharing) {
        newErrors.name = 'sharing'
        newErrors.error = 'Please select the sharing option.';
      }
      
      if (propertyDetails.withoutFood === null) {
        newErrors.name = 'withoutFood'
        newErrors.error = 'Please select whether without food option is available.';
      }
    }
    if (!propertyDetails.memberedAllowed) {
      newErrors.name = 'memberedAllowed'
      newErrors.error = 'Please select whether members are allowed.';
    }

    if (!propertyDetails.bathroom) {
      newErrors.name = 'bathroom'
      newErrors.error = 'Please select the number of bathrooms.';
    }

    if (!propertyDetails.bedroom) {
      newErrors.name = 'bedroom'
      newErrors.error = 'Please select the number of bedrooms.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNextClick = () => {
    const isValid = validateForm();
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="container row" id="step2">
      <div className="col-md-3">
        <div className="step-navigation" id="progressBar">
          <div className={"step completed"}>
            <span className="step-number completed">✔</span>
            Basic Details
          </div>
          <div className="d-flex">
            <div className="connector completed"></div>
            <small
              style={{
                color: "#000000a2",
                marginLeft: "10px",
                fontSize: "13px",
              }}
            >
              Step 1
            </small>
          </div>
          <div className={"step active completed"}>
            <span className="step-number active"></span>
            Property Profile
          </div>
          <div className="d-flex">
            <div className="connector"></div>
            <small
              style={{
                color: "#000000a2",
                marginLeft: "10px",
                fontSize: "13px",
              }}
            >
              Step 2
            </small>
          </div>
          <div className={"step"}>
            <span className="step-number"></span>
            Proprty Pricing
          </div>
          <div className="d-flex">
            <div className="connector"></div>
            <small
              style={{
                color: "#000000a2",
                marginLeft: "10px",
                fontSize: "13px",
              }}
            >
              Step 3
            </small>
          </div>
          <div className="step">
            <span className="step-number"></span>
            Photos
          </div>
        </div>
        <div className="mt-3" id="needHelp">
          <h2>Need Help ?</h2>
          <h6 style={{ opacity: "0.8" }}>Contact us Now</h6>
          <span>
            <FontAwesomeIcon icon={faPhone} /> +91-9999999999{" "}
          </span>
        </div>
      </div>
      <div className="col-md-5" id="middle">
        <div
          role="button"
          id="backDiv"
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          {"  "} Back
        </div>
        <h4 className="MiddleHeading mt-4">Tell us about your property</h4>
        <FormGroup>
          <Label id="labelforMobileView" style={{ fontWeight: "500" }}>No of Bedrooms :</Label>
          <div className="radio-groups">
            {bedrooms.map((button) => (
              <div
                key={button.value}
                className={`radio-button rounded-circle  ${
                  propertyDetails.bedroom === button.value ? "selected" : ""
                }`}
                onClick={() => onChange(button.value, "bedroom")}
              >
                <Label id="labelforMobileView" className="radio-label">
                  <input
                    type="radio"
                    value={button.value}
                    checked={propertyDetails.bedroom === button.value}
                    onChange={() => onChange(button.value, "bedroom")}
                  />
                  {button.label}
                </Label>
              </div>
            ))}
          </div>
          {errors.name==="bedroom" && <div className="error-message text-danger">{errors.error}</div>}
        </FormGroup>
        <FormGroup>
          <Label id="labelforMobileView" style={{ fontWeight: "500" }}>No of Bathrooms :</Label>
          <div className="radio-groups">
            {bedrooms.map((button) => (
              <div
                key={button.value}
                className={`radio-button rounded-circle  ${
                  propertyDetails.bathroom === button.value ? "selected" : ""
                }`}
                onClick={() => onChange(button.value, "bathroom")}
              >
                <Label id="labelforMobileView" className="radio-label">
                  <input
                    type="radio"
                    value={button.value}
                    checked={propertyDetails.bathroom === button.value}
                    onChange={() => onChange(button.value, "bathroom")}
                  />
                  {button.label}
                </Label>
              </div>
            ))}
          </div>
          {errors.name==="bathroom" && <div className="error-message text-danger">{errors.error}</div>}
        </FormGroup>
        <FormGroup>
          <Label id="labelforMobileView" style={{ fontWeight: "500" }}>Membered Allowed:</Label>
          <div className="radio-groups">
            {memberedAllowed.map((button) => (
              <div
                key={button.value}
                className={`radio-button rounded-pill  ${
                  propertyDetails.memberedAllowed === button.value ? "selected" : ""
                }`}
                onClick={() => onChange(button.value, "memberedAllowed")}
              >
                <Label id="labelforMobileView" className="radio-label">
                  <input
                    type="radio"
                    value={button.value}
                    checked={propertyDetails.memberedAllowed === button.value}
                    onChange={() => onChange(button.value, "memberedAllowed")}
                  />
                  {button.label}
                </Label>
              </div>
            ))}
          </div>
          {errors.name==="memberedAllowed" && <div className="error-message text-danger">{errors.error}</div>}
        </FormGroup>
        {propertyDetails.type === "pg" && (
          <div className="">
            <FormGroup>
              <Label id="labelforMobileView" style={{ fontWeight: "500" }}>Available in:</Label>
              <div className="radio-groups">
                {sharings.map((button) => (
                  <div
                    key={button.value}
                    className={`radio-button rounded-pill  ${
                      propertyDetails.sharing === button.value ? "selected" : ""
                    }`}
                    onClick={() => onChange(button.value, "sharing")}
                  >
                    <Label id="labelforMobileView" className="radio-label">
                      <input
                        type="radio"
                        value={button.value}
                        checked={propertyDetails.sharing === button.value}
                        onChange={() => onChange(button.value, "sharing")}
                      />
                      {button.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.name==="sharing" && <div className="error-message text-danger">{errors.error}</div>}
            </FormGroup>
            <FormGroup>
              <Label id="labelforMobileView" style={{ fontWeight: "500" }}>
                Without Food Option Available:
              </Label>
              <div className="radio-groups">
                {yesno.map((button) => (
                  <div
                    key={button.value}
                    className={`radio-button rounded-pill  ${
                      propertyDetails.withoutFood === button.value
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => onChange(button.value, "withoutFood")}
                  >
                    <Label id="labelforMobileView" className="radio-label">
                      <input
                        type="radio"
                        value={button.value}
                        checked={propertyDetails.withoutFood === button.value}
                        onChange={() => onChange(button.value, "withoutFood")}
                      />
                      {button.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.name==="withoutFood" && <div className="error-message text-danger">{errors.error}</div>}
            </FormGroup>
          </div>
        )}
        {propertyDetails.type === "sharing flat" && (
          <div className="">
            <FormGroup>
              <Label id="labelforMobileView" style={{ fontWeight: "500" }}>Currently Living:</Label>
              <div className="radio-groups">
                {bedrooms.map((button) => (
                  <div
                    key={button.value}
                    className={`radio-button rounded-circle  ${
                      propertyDetails.currentlyLiving === button.value
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => onChange(button.value, "currentlyLiving")}
                  >
                    <Label id="labelforMobileView" className="radio-label">
                      <input
                        type="radio"
                        value={button.value}
                        checked={
                          propertyDetails.currentlyLiving === button.value
                        }
                        onChange={() =>
                          onChange(button.value, "currentlyLiving")
                        }
                      />
                      {button.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.name==="currentlyLiving" && <div className="error-message text-danger">{errors.error}</div>}
            </FormGroup>
            <FormGroup>
              <Label id="labelforMobileView" style={{ fontWeight: "500" }}>
                No. of Vacency Available:
              </Label>
              <div className="radio-groups">
                {bedrooms.map((button) => (
                  <div
                    key={button.value}
                    className={`radio-button rounded-circle  ${
                      propertyDetails.vacancyAvailable === button.value
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => onChange(button.value, "vacancyAvailable")}
                  >
                    <Label id="labelforMobileView" className="radio-label">
                      <input
                        type="radio"
                        value={button.value}
                        checked={
                          propertyDetails.vacancyAvailable === button.value
                        }
                        onChange={() =>
                          onChange(button.value, "vacancyAvailable")
                        }
                      />
                      {button.label}
                    </Label>
                  </div>
                ))}
                {errors.name==="vacancyAvailable" && <div className="error-message text-danger">{errors.error}</div>}
              </div>
            </FormGroup>
          </div>
        )}
        <FormGroup>
          <Label id="labelforMobileView" style={{ fontWeight: "500" }}>Non-Veg Allowed:</Label>
          <div className="radio-groups">
            {yesno.map((button) => (
              <div
                key={button.value}
                className={`radio-button rounded-pill  ${
                  propertyDetails.nonVegAllowed === button.value
                    ? "selected"
                    : ""
                }`}
                onClick={() => onChange(button.value, "nonVegAllowed")}
              >
                <Label id="labelforMobileView" className="radio-label">
                  <input
                    type="radio"
                    value={button.value}
                    checked={propertyDetails.nonVegAllowed === button.value}
                    onChange={() => onChange(button.value, "nonVegAllowed")}
                  />
                  {button.label}
                </Label>
              </div>
            ))}
          </div>
          {errors.name==="nonVegAllowed" && <div className="error-message text-danger">{errors.error}</div>}
        </FormGroup>
        <FormGroup>
          <Label id="labelforMobileView" style={{ fontWeight: "500" }}>Furnished Type:</Label>
          <div className="radio-groups">
            {furnishedType.map((button) => (
              <div
                key={button.value}
                className={`radio-button rounded-pill  ${
                  propertyDetails.furnishedType === button.value
                    ? "selected"
                    : ""
                }`}
                onClick={() => onChange(button.value, "furnishedType")}
              >
                <Label id="labelforMobileView" className="radio-label">
                  <input
                    type="radio"
                    value={button.value}
                    checked={propertyDetails.furnishedType === button.value}
                    onChange={() => onChange(button.value, "furnishedType")}
                  />
                  {button.label}
                </Label>
              </div>
            ))}
          </div>
          {errors.name==="furnishedType" && <div className="error-message text-danger">{errors.error}</div>}
        </FormGroup>
        <FormGroup>
          <Label id="labelforMobileView" style={{ fontWeight: "500" }}>
            Select Amenities available:
          </Label>
          <div className="radio-groups">
            <div className="checkbox-group">
              {amenities.map((button) => (
                <div
                  key={button.value}
                  className={`checkbox-button rounded-pill  ${
                    propertyDetails.amenities.includes(button.value)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => toggleCheckbox(button.value)}
                >
                  <Label id="labelforMobileView" className="checkbox-label" htmlFor={button.value}>
                    <input
                      type="checkbox"
                      value={button.value}
                      checked={propertyDetails.amenities.includes(button.value)}
                      onChange={() => toggleCheckbox(button.value)}
                    />
                    {button.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
            {errors.name==="amenities" && <div className="error-message text-danger">{errors.error}</div>}
        </FormGroup>
        <div className="ButtonBox mt-4">
          <Button
            className="previousBtn rounded margin-demo"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Previous
          </Button>
          <Button
            className="continueBtn rounded margin-demo1"
            onClick={handleNextClick}
          >
            Continue
          </Button>
        </div>
      </div>
      <div className="col-md-3" id="contactSection"></div>
    </div>
  );
};

export default Step2;
