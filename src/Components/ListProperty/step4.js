import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faCircleXmark,
  faClose,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { Button, FormGroup, Input, Label } from "reactstrap";
const Step4 = ({
  propertyDetails,
  updatePropertyDetails,
  currentStep,
  setCurrentStep,
}) => {
  const [address, setAddress] = useState({
    houseno: "",
    area: "",
    pincode: "",
    streetAddress: "",
    latitude: "",
    logitude: "",
    link:""
  });
  const [photos, setPhotos] = useState([]);
  const onDrop = (acceptedFiles) => {
    setPhotos(acceptedFiles);
    // const updatedSelections = [...propertyDetails.photos, ...acceptedFiles];
    // const newDetails = { ...propertyDetails, photoUrls: acceptedFiles };
    // updatePropertyDetails(newDetails);
  };
  const handleBlur =(e)=>{
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
    const updatedAddress = { ...propertyDetails, address: address };
    updatePropertyDetails(updatedAddress);
  }
  const handleAddressChange = (field, value) => {
    setAddress({
      ...address,
      [field]: value,
    });
    const updatedAddress = { ...propertyDetails, address: address };
    updatePropertyDetails(updatedAddress);
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Allow only image files
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // const makeAddress = async()=>{
  //   const formattedAddress = `${address.streetAddress} ${address.area} Ahmedabad Gujrat India`;
  //     const apiUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${formattedAddress}&apiKey=${process.env.REACT_APP_API_KEY}`;
  //     try {
  //       const response = await fetch(apiUrl);
  //       const data = await response.json();
  //       if (data.items.length > 0) {
  //         const { lat, lng } = data.items[0].position;
  //         setAddress((prevAddress) => ({
  //           ...prevAddress,
  //           latitude: lat,
  //           logitude: lng,
  //           link:`https://www.google.com/maps?q=${lat},${lng}`
  //         }));
  //         const updatedAddress = { ...propertyDetails, address: address };
  //         updatePropertyDetails(updatedAddress);
  //       } else {
  //         console.log("No coordinates found for the given address.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  // }
  const handleSubmit = async () => {
    const isValid = validateForm();
    if (isValid) {
      setLoading(true);
      setThankyoumodal(true);
      try {
        // await makeAddress()
        const formData = new FormData();
          formData.append("property", JSON.stringify(propertyDetails));
          photos.forEach((image) => {
            formData.append("photos", image);
          });
        const response = await fetch(
          `${process.env.REACT_APP_API_IP}/property/add`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (response.ok) {
          setLoading(false);
          setSuccess(true);
        } else {
          setSuccess("Error");
          setLoading(false);
          console.error("Failed to submit property:", response.status);
        }
      } catch (error) {
        setLoading(false);
        setSuccess("Error");
        console.error("Error submitting property:", error);
      }
    }
  };
  const [errors, setErrors] = useState({
    name: "",
    error: "",
  });
  const validateForm = () => {
    const newErrors = {};
    if (!address.streetAddress) {
      newErrors.name = "streetAddress";
      newErrors.error = "Please enter the street address.";
    }
    if (!address.houseno) {
      newErrors.name = "houseno";
      newErrors.errpr = "Please enter the house no./society name.";
    }

    if (!address.pincode) {
      newErrors.name = "pincode";
      newErrors.error = "Please enter the pincode.";
    }
    if (!address.area) {
      newErrors.name = "area";
      newErrors.error = "Please enter the area.";
    }

    // Validate photos
    if (photos.length < 3) {
      newErrors.name = "photos";
      newErrors.error = "Please upload at least Four photo.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const [thankyoumodal, setThankyoumodal] = useState(false);
  const Navigate = useNavigate();
  const thankyouModal = () => {
    if (success==="Error") {
      setThankyoumodal(false)
    }else{
      Navigate("/myaccount/listedproperty");
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
          <div className={"step completed "}>
            <span className="step-number completed">✔</span>
            Proprty Pricing
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
              Step 3
            </small>
          </div>
          <div className="step active">
            <span className="step-number active"></span>
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
        <h4 className="MiddleHeading my-4">Add Photos of your property</h4>
        <FormGroup>
          <Label id="labelforMobileView" style={{ fontWeight: "500" }}>
            Upload Photos:
          </Label>
          <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag &amp; drop photos here, or click to select files</p>
          </div>
          {photos.length > 0 && (
            <div className="mt-4">
              <p>Uploaded Photos:</p>
              <div className="uploaded-photos d-flex flex-wrap justify-content-evenly">
                {photos.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded  ${index + 1}`}
                    className="uploaded-photo"
                    style={{ width: "100px", height: "100px" }}
                  />
                ))}
              </div>
            </div>
          )}
          {errors.name === "photos" && (
            <div className="error-message text-danger">{errors.error}</div>
          )}
        </FormGroup>
        <div>
          <h6 className="my-4">Fill Address Details :</h6>
          <div className="addressBox">
            <FormGroup>
              <Label id="labelforMobileView">Area :</Label>
              <Input
                type="text"
                className="inputStep3"
                name="area"
                value={address.area}
                onBlur={handleBlur}
                onChange={(e) => handleAddressChange("area", e.target.value)}
              />
              {errors.name === "area" && (
                <div className="error-message text-danger">{errors.error}</div>
              )}
            </FormGroup>
            <FormGroup>
              <Label id="labelforMobileView" style={{ fontWeight: "500" }}>
                Pincode :
              </Label>
              <Input
                type="number"
                className="inputStep3"
                name="pincode"
                onBlur={handleBlur}
                value={address.pincode || ""}
                onChange={(e) =>
                  handleAddressChange("pincode", parseInt(e.target.value))
                }
              />
              {errors.name === "pincode" && (
                <div className="error-message text-danger">{errors.error}</div>
              )}
            </FormGroup>
          </div>
          <FormGroup>
            <Label id="labelforMobileView" style={{ fontWeight: "500" }}>
              House No./Society Name :
            </Label>
            <Input
              type="text"
              className="inputStep3"
              name="houseno"
              onBlur={handleBlur}
              value={address.houseno}
              onChange={(e) => handleAddressChange("houseno", e.target.value)}
            />
            {errors.name === "houseno" && (
              <div className="error-message text-danger">{errors.error}</div>
            )}
          </FormGroup>
          <FormGroup>
            <Label id="labelforMobileView">Street Address:</Label>
            <Input
              type="text"
              name="streetAddress"
              className="inputStep3"
              value={address.streetAddress}
              onBlur={handleBlur}
              onChange={(e) =>
                handleAddressChange("streetAddress", e.target.value)
              }
            />
            {errors.name === "streetAddress" && (
              <div className="error-message text-danger">{errors.error}</div>
            )}
          </FormGroup>
        </div>
        <Button onClick={handleSubmit} className="continueBtn rounded">
          Submit
        </Button>
      </div>
      <div className={`login-modal ${thankyoumodal ? "open" : ""}`}>
        <div className="modal-content">
          <Form>
            <div className="titleBox d-flex flex-column">
              <div className="closeBox">
                <span className="close" onClick={thankyouModal}>
                  <FontAwesomeIcon icon={faClose} />
                </span>
              </div>
              </div>
              {!loading ? (
                <div className="p-4">
                  <div className="d-flex justify-content-center">
                    {success === true ? (
                      <FontAwesomeIcon icon={faCircleCheck} style={{fontSize:"50px" ,color:"#287DFD"}}   />
                    ) : (
                      <FontAwesomeIcon icon={faCircleXmark}  style={{fontSize:"50px"}} />
                    )}
                  </div>
                  <div className="subheading text-center fs-5 mt-3" >
                    {success === true
                      ? `Thank you for adding your ${propertyDetails.type}! Your post is now under admin approval for security and authenticity purposes. It will be live within one hour. Stay tuned!`
                      : "Internal Server Error Please try again later"}
                  </div>
                  <button className="mt-4" type="button" onClick={thankyouModal}>
                    Continue
                  </button>
                </div>
              ) : (
                <div>
                  <Spinner animation="border" variant="primary" />
                </div>
              )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Step4;
