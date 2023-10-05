import { faArrowLeft, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, FormGroup, Input } from "reactstrap";

const Step3 = ({
  propertyDetails,
  updatePropertyDetails,
  currentStep,
  setCurrentStep,
  handleInputChange,
}) => {
  const [additionalCosts, setAdditionalCosts] = useState({
    description1: "",
    cost1: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [addInst, setAddInst] = useState(false);
  const toggleSection = () => {
    setIsOpen(!isOpen);
  };
  const setDate = (e) => {
    const newAvailableFrom = e.target.value;
    const newDetails = { ...propertyDetails, availableFrom: newAvailableFrom };
    updatePropertyDetails(newDetails);
  };
  const handleCheckboxChange = () => {
    const newDetails = {
      ...propertyDetails,
      isNegotiable: !propertyDetails.isNegotiable,
    };
    updatePropertyDetails(newDetails);
  };
  const handleFieldChange = (field, value) => {
    setAdditionalCosts((prevCosts) => ({
      ...prevCosts,
      [field]: value,
    }));
  };

  const handleAddMore = () => {
    const nextIndex = Object.keys(additionalCosts).length / 2 + 1;
    if (nextIndex <= 3) {
      setAdditionalCosts((prevCosts) => ({
        ...prevCosts,
        [`description${nextIndex}`]: "",
        [`cost${nextIndex}`]: "",
      }));
      const newDetails = {
        ...propertyDetails,
        additionalCosts: additionalCosts,
      };
      updatePropertyDetails(newDetails);
    }
  };
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
  const preference = [
    { value: "students", label: "Students" },
    { value: "both", label: "Both" },
    { value: "working professionals", label: "Working professionals" },
  ];
  const [errors,setErrors] = useState({
    name:"",
    error:""
  });
  const validateForm = () => {
    const newErrors = {};
    if (!propertyDetails.preference) {
      newErrors.name = 'preference'
      newErrors.error = 'Please select the preference.';
    }
    if (propertyDetails.type  === "sharing flat") {
      if (!propertyDetails.totalFlatRent) {
        newErrors.name = 'totalFlatRent'
        newErrors.error = 'Please enter the Total rent amount.';
      }
      if (!propertyDetails.rentEachHead) {
        newErrors.name = 'rentEachHead'
        newErrors.error = 'Please enter the  Rent each head amount.';
      }
    }
    if (!propertyDetails.deposit) {
      newErrors.name = 'deposit'
      newErrors.error = 'Please enter the deposit amount.';
    }
    if (propertyDetails.type  === "pg") {
    if (!propertyDetails.rent) {
      newErrors.name = 'rent'
      newErrors.error = 'Please enter the rent amount.';
    }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleNextClick = () => {
    const isValid = validateForm();
    console.log(isValid)
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
          <div className={"step completed"}>
            <span className="step-number completed">✔</span>
            Property Profile
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
              Step 2
            </small>
          </div>
          <div className={"step active "}>
            <span className="step-number active"></span>
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
        <h4 className="MiddleHeading my-4">Add Pricing and details...</h4>
        <FormGroup className="d-flex flex-wrap align-items-center">
            <label id="labelforMobileView" style={{ fontWeight: "500" }}>Available from : </label>
           <Input  
            type="date"
            style={{ width: "50%", marginLeft: "0.8rem" }}
            className="inputStep3"
            name="availableFrom"
            value={propertyDetails.availableFrom}
            onChange={setDate}
          />
           {errors.name==="available" && <div className="error-message text-danger">{errors.error}</div>}
        </FormGroup>
        {propertyDetails.type !== "sharing flat" && (
          <div>
            <div className="d-flex flex-wrap justify-content-between">
              <FormGroup>
               <label id="labelforMobileView">Rent : </label>
                 <Input  
                  type="text"
                  className="inputStep3"
                  name="rent"
                  value={propertyDetails.rent}
                  onChange={handleInputChange}
                />
                 {errors.name==="rent" && <div className="error-message text-danger">{errors.error}</div>}
              </FormGroup>
              <FormGroup>
                  <label id="labelforMobileView" style={{ fontWeight: "500" }}>
                  Deposit (in Months):
                 </label>
                 <Input   
                  type="number"
                  className="inputStep3"
                  name="deposit"
                  placeholder="Ex: 1 Rent"
                  value={propertyDetails.deposit}
                  onChange={handleInputChange}
                />
                 {errors.name==="deposit" && <div className="error-message text-danger">{errors.error}</div>}
              </FormGroup>
            </div>
            <FormGroup check>
              <label check>
                 <Input   
                  type="checkbox"
                  name="isNegotiable"
                  checked={propertyDetails.isNegotiable}
                  onChange={handleCheckboxChange}
                />
                <small>Rent Negotiable</small>
               </label>
            </FormGroup>
          </div>
        )}
        {propertyDetails.type === "sharing flat" && (
          <>
          <div className="d-flex flex-wrap justify-content-between">
            <FormGroup>
                <label id="labelforMobileView" style={{ fontWeight: "500" }}>Total Flat Rent : </label>
               <Input   
                type="number"
                className="inputStep3"
                name="totalFlatRent"
                placeholder="Total Flat Rent"
                value={propertyDetails.totalFlatRent}
                onChange={handleInputChange}
              />
               {errors.name==="totalRentFlat" && <div className="error-message text-danger">{errors.error}</div>}
            </FormGroup>
            <FormGroup>
                <label id="labelforMobileView" style={{ fontWeight: "500" }}>Rent Each Head : </label>
               <Input  
                type="number"
                className="inputStep3"
                name="rentEachHead"
                placeholder="Rent Each Head"
                value={propertyDetails.rentEachHead}
                onChange={handleInputChange}
              />
               {errors.name==="rentEachHead" && <div className="error-message text-danger">{errors.error}</div>}
            </FormGroup>
          </div>
          <FormGroup>
                  <label id="labelforMobileView" style={{ fontWeight: "500" }}>
                  Deposit (in Months):
                 </label>
                 <Input  
                  type="number"
                  className="inputStep3"
                  name="deposit"
                  placeholder="Ex: 1 Rent"
                  style={{width:"42%"}}
                  value={propertyDetails.deposit}
                  onChange={handleInputChange}
                />
                 {errors.name==="deposit" && <div className="error-message text-danger">{errors.error}</div>}
              </FormGroup>
          </>
        )}
        <span className="text-primary" role="button" onClick={toggleSection}>
          {isOpen
            ? <> - Additional Cost <span className="grey">(optional)</span> </>
            : <> + Additional Cost <span className="grey">(optional)</span> </>}
        </span>
        {isOpen && (
          <div className=" pb-3">
            {Object.keys(additionalCosts).map((key, index) => {
              if (index % 2 === 0) {
                const descriptionKey = key;
                const costKey = `cost${index / 2 + 1}`;
                return (
                  <div className="d-flex" key={index}>
                     <Input  
                      type="text"
                      placeholder="Description"
                      value={additionalCosts[descriptionKey]}
                      onChange={(e) =>
                        handleFieldChange(descriptionKey, e.target.value)
                      }
                    />
                     <Input  
                      type="text"
                      style={{width:"50%",marginLeft:"0.8rem"}}
                      placeholder="Cost"
                      value={additionalCosts[costKey]}
                      onChange={(e) =>
                        handleFieldChange(costKey, e.target.value)
                      }
                    />
                  </div>
                );
              }
              return null;
            })}
            {Object.keys(additionalCosts).length / 2 < 3 && (
              <div role="button" className="mt-1 fs-7 grey" onClick={handleAddMore}>+ Add More</div>
            )}
          </div>
        )}
        <div className="mt-3">
          <span
            className="text-primary"
            role="button"
            onClick={() => {
              setAddInst(!addInst);
            }}
          >
            {addInst
              ? <> - Add instructions <span className="grey">(optional)</span> </>
              : <> + Add instructions <span className="grey">(optional)</span> </>}
          </span>
          {addInst && (
            <FormGroup className=" py-3">
                <label id="labelforMobileView" style={{ fontWeight: "500" }}>
                Add instructions or any rules or regulations:
               </label>
               <Input  
                type="text"
                className="inputStep3"
                name="instructions"
                placeholder="Write Here..."
                value={propertyDetails.instructions}
                onChange={handleInputChange}
              />
            </FormGroup>
          )}
        </div>
        <FormGroup className="mt-3">
            <label id="labelforMobileView" style={{ fontWeight: "500" }}>Preference: </label>
          <div className="radio-groups">
            {preference.map((button) => (
              <div
                key={button.value}
                className={`radio-button rounded-pill px-3 ${
                  propertyDetails.preference === button.value ? "selected" : ""
                }`}
                onClick={() => onChange(button.value, "preference")}
              >
                <label className="radio-label " id="labelforMobileView">
                   <Input  
                    type="radio"
                    value={button.value}
                    checked={propertyDetails.preference === button.value}
                    onChange={() => onChange(button.value, "preference")}
                  />
                  {button.label}
                 </label>
              </div>
            ))}
          </div>
          {errors.name==="preference" && <div className="error-message text-danger">{errors.error}</div>}
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

export default Step3;
