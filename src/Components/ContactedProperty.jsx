import "./ContactedProperty.css";
import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as fasolidHeart,
  faEllipsisVertical,
  faLocationDot,
  faArrowLeft,
  faArrowRight,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./Login.js";
import {
  faHeart,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import {  Button } from "reactstrap";
import CustomCarousel from "./Others/CustomCarousel";
import { ToastContainer, toast } from "react-toastify";
const ContactedProperty = ({user}) => {
  
  const [contactedProperties,setcontactedProperties] = useState([]);

  const handleShareClick = async (title,url) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          url: url,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        console.log('Web Share API is not supported.');
        // You can implement a custom popup/modal here
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }
  const toggleBookmark = async(id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_IP}/user/saved`, {
        method: 'POST',
        body: JSON.stringify({id:user.id,propertyId:id }), // Convert object to JSON string
        headers: {
          'Content-Type': 'application/json' // Set the correct content type for JSON
        }
      });
      if (response.ok) {
        window.location.reload()
      } else {
        console.error('Failed to submit property:', response.status);
      }
    } catch (error) {
      console.error('Error submitting property:', error);
    }
  };
  useEffect(() => {
    if (user) {
      try {
        fetch(`${process.env.REACT_APP_API_IP}/property/${user.id}/ContactedProperties`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
            setcontactedProperties(data);
          })
        .catch((err) => console.log(err));
      
      } catch (error) {
        console.log(error)
      }
    }
  }, [user]);
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages = 1;
  let visibleData = [];
  visibleData = contactedProperties
  if (contactedProperties && contactedProperties.length >10) {
     totalPages = Math.ceil(contactedProperties.length / 10);
     const startIndex = (currentPage - 1) * 10;
     const endIndex = startIndex + 10;
     visibleData = contactedProperties.slice(startIndex, endIndex);
 }
 const [loginmodal, setLoginmodal] = useState(false);
  const loginModal = () => setLoginmodal(!loginmodal);
 const sendmessage = async(id,phone)=>{
  if (!user) {
    loginModal();
  } else {
    if (user.contacted_property.includes(id)) {
      window.location.href = (`https://wa.me/${phone}`)
    }
    else{if (user.propertyCount > 0 ) {
      try {
        const data = {
          id: user.id,
          propertyId: id,
        };
        const response = await fetch(
          `${process.env.REACT_APP_API_IP}/property/contacted`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (response.ok) {
          window.location.href = (`https://wa.me/${phone}`)
        } else {
          console.error("Failed to submit property:", response.status);
        }
      } catch (error) {
        console.error("Error submitting property:", error);
      }
    } else {
      alert("Please Buy Premium");
    }}
  }
}
 const goToPreviousPage = () => {
   if (currentPage > 1) {
     setCurrentPage(currentPage - 1);
   }
 };

 const goToNextPage = () => {
   if (currentPage < totalPages) {
     setCurrentPage(currentPage + 1);
   }
 };
 const [showReportButtonForProperty, setShowReportButtonForProperty] =
 useState(null);
const handleMouseEnter = (propertyId) => {
 setShowReportButtonForProperty(propertyId);
};

const handleMouseLeave = () => {
 setShowReportButtonForProperty(null);
};
const reportProperty = async (reason, id, ownerId) => {
 if (user) {
   try {
     const data = {
       userId: user.id,
       propertyId: id,
       ownerId: ownerId,
       reportTopic: reason,
     };
     const response = await fetch(
       `${process.env.REACT_APP_API_IP}/report/Report-Property`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
       }
     );
     if (response.ok) {
       toast.success("Property Reported Successfully", {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
     } else {
       console.error("Failed to submit property:", response.status);
     }
   } catch (error) {
     console.error("Error submitting property:", error);
   }
 } else {
   toast.error("Login to report Property", {
     position: "top-right",
     autoClose: 5000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: "light",
   });
 }
};
  return (
    <div className="MainContainer">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    <div className="contactedPageMain ">

    <div id="contactedPropertyHeading">
    <h4 className="mt-5">Contacted Properties :</h4>
    </div>
      <div className="mb-3 " style={{ maxWidth: "100%" }}>
      {visibleData.length === 0 && ( // Check if visibleData is empty
            <div className="fs-2 mb-5 text-center">No Result Found</div>
          )}
        {visibleData.map((property, index) => (
                <div
                  className="row shadow-sm no-gutters rounded-2"
                  key={index}
                  id="propertyCard"
                >
                  <div className="col-md-4 p-0">
                    <div id="GenderBox">
                      <span className="">{property.memberedAllowed}</span>
                    </div>
                    <CustomCarousel photoUrls={property.photoUrls} />
                    <div id="iconBox">
                      <span
                        className={`bookmark-button ShareIcons heart ${ (user && user.saved_property.includes(property.id)) ? "bookmarked" : "" }`}
                        onClick={()=>{toggleBookmark(property.id)}}
                      >
                        {!(user && user.saved_property.includes(property.id)) ? (
                          <FontAwesomeIcon icon={faHeart} />
                        ) : (
                          <FontAwesomeIcon icon={fasolidHeart} />
                        )}
                      </span>
                      <span className="ShareIcons" style={{zIndex:"2"}}  onClick={()=>{handleShareClick(property.title,`/particular-property/${property.id}`)}}>
                        <FontAwesomeIcon icon={faShareFromSquare} />
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6" id="propertyCard-body">
                    <Link
                      className="text-decoration-none text-dark"
                      to={`/particular-property/${property.id}`}
                    >
                      <div id="card-Heading">
                        {property.title}
                      </div>
                      <div id="card-location" className="row">
                        <div id="" className="col">
                          <FontAwesomeIcon
                            className="me-2 grey"
                            icon={faLocationDot}
                          />{" "}
                          {property.address.area} Ahemdabad{" "}
                          {property.address.pincode}
                        </div>
                        <div className="LaptopHide col">
                          Type : {property.furnishedType}
                        </div>
                      </div>
                      <div id="card-Details" className="row">
                        <div id="Details" className="col">
                          <span className="grey">Available For :</span>{" "}
                          {property.memberedAllowed}
                        </div>
                        <div id="Details" className="col">
                          <span className="grey">Property Type :</span>{" "}
                          {property.subtype.length > 12
                      ? `${property.subtype.substring(0, 12)}...`
                      : property.subtype}
                        </div>
                      </div>
                      <div id="card-Details" className="row">
                        <div id="Details" className="col">
                          <span className="grey">Property Size :</span>{" "}
                          {property.bedroom} BHK
                        </div>
                        <div id="Details" className="col">
                          <span className="grey">Status :</span> Available
                        </div>
                      </div>
                      <div id="emnities" className=" mobileAndTab-hide">
                        {property.amenities.includes("electricity") && (
                          <img
                            className="amenities-size"
                            src="/emenities/electricity.svg"
                            alt="Amenities"
                          />
                        )}
                        {property.amenities.includes("cctv") && (
                          <img
                            className=" amenities-size"
                            src="/emenities/cctv.svg"
                            alt="Amenities"
                          />
                        )}
                        {property.amenities.includes("cooking") && (
                          <img
                            className=" amenities-size"
                            src="/emenities/gas-included.svg"
                            alt="Amenities"
                          />
                        )}
                        {property.amenities.includes("24*7-water") && (
                          <img
                            className=" amenities-size"
                            src="/emenities/water-included.svg"
                            alt="Amenities"
                            style={{ color: "red" }}
                          />
                        )}
                        {property.amenities.includes("house-keeping") && (
                          <img
                            className=" amenities-size"
                            src="/emenities/housekeeping.webp"
                            alt="Amenities"
                            style={{ color: "red" }}
                          />
                        )}
                        {property.amenities.includes("2-wheeler-parking") && (
                          <img
                            className=" amenities-size"
                            src="/emenities/parking-area.png"
                            alt="Amenities"
                            style={{ color: "red" }}
                          />
                        )}
                        {property.amenities.includes("fans") && (
                          <img
                            className=" amenities-size"
                            src="/emenities/fan.png"
                            alt="Amenities"
                            height="30px"
                            width="30px"
                            style={{ color: "red" }}
                          />
                        )}
                      </div>
                      <div id="rentBox" className="row">
                        <div className="col p-0 mobileAndTab-hide">
                          <b
                            style={{
                              fontSize: "23px",
                              color: "rgba(0, 0, 0, 0.6)",
                            }}
                          >
                            ₹ {property.rent}
                          </b>{" "}
                          <span className="grey">/per month</span>
                        </div>
                        <div
                          className="col p-0 mobileAndTab-hide "
                          style={{ color: "rgba(0, 0, 0, 0.7)" }}
                        >
                          {" "}
                          <span className="grey">Deposit </span>:{" "}
                          {property.deposit} Rent{" "}
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-2 rounded-4 " id="card-ButtonBox">
                    <div className="flex justify-content-around" id="IconGroup">
                      <span
                        className={`bookmark-button heart ${(user && user.saved_property.includes(property.id)) ? "bookmarked" : "" }`}
                        onClick={()=>{toggleBookmark(property.id)}}
                      >
                        { !(user && user.saved_property.includes(property.id))  ? (
                          <FontAwesomeIcon icon={faHeart} />
                        ) : (
                          <FontAwesomeIcon icon={fasolidHeart} />
                        )}
                      </span>
                      <span className="ShareIcons"  onClick={()=>{handleShareClick(property.title,`/particular-property/${property.id}`)}}>
                        <FontAwesomeIcon icon={faShareFromSquare} />
                      </span>
                      <span className="ShareIcons "                      
                      onMouseEnter={() => handleMouseEnter(property.id)}
                      onMouseLeave={handleMouseLeave}
                       >
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </span>
                    {showReportButtonForProperty === property.id && (
                      <div
                        className="reportBlock"
                        onMouseEnter={() => handleMouseEnter(property.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <h6 className="text-center">Report Property</h6>
                        <ul>
                          <li
                            role="button"
                            onClick={() => {
                              reportProperty(
                                "Rent Out",
                                property.id,
                                property.ownerId
                              );
                            }}
                          >
                            Rent Out
                          </li>
                          <li
                            role="button"
                            onClick={() => {
                              reportProperty(
                                "Broker's Post",
                                property.id,
                                property.ownerId
                              );
                            }}
                          >
                            Broker's Post
                          </li>
                          <li
                            role="button"
                            onClick={() => {
                              reportProperty(
                                "Asking for Brokerage",
                                property.id,
                                property.ownerId
                              );
                            }}
                          >
                            Asking for Brokerage
                          </li>
                          <li
                            role="button"
                            onClick={() => {
                              reportProperty(
                                "Not Answering",
                                property.id,
                                property.ownerId
                              );
                            }}
                          >
                            Not Answering
                          </li>
                        </ul>
                      </div>
                    )}
                    </div>
                    <div className="ownerBox">
                      <span>Owner :</span>
                      <br /> {property.name}
                    </div>
                    <div className="LaptopHide">
                      <b
                        style={{
                          marginLeft: "2px",
                          fontSize: "20px",
                          color: "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        ₹ {property.rent}
                      </b>{" "}
                      <span className="grey" style={{ fontSize: "12px" }}>
                        /per month
                      </span>
                    </div>
                    <Button id="contact-owner">
                    {user &&
                      user.contacted_property &&
                      user.contacted_property.includes(property.id)
                        ? <>
                           <FontAwesomeIcon icon={faPhone}/> {property.phone}
                          </>
                        : "Contact Owner"}
                    </Button>
                    <Button className=" mobileAndTab-hide" id="send-message" onClick={()=>{sendmessage(property.id,property.phone)}}>
                      Send Message
                    </Button>
                    <Link to={'https://wa.me/9316066832'} className="needHelp">Need Help?</Link>
                  </div>
                </div>
              ))}
            {contactedProperties.length>10 && <div className="paginationBox">
                <Button className="paginationBtn" onClick={goToPreviousPage}> <FontAwesomeIcon icon={faArrowLeft}/> Previous </Button>
                <Button className="paginationBtn" onClick={goToNextPage}>Next <FontAwesomeIcon icon={faArrowRight}/></Button>
            </div>}
      </div>
      
      <LoginModal isOpen={loginmodal} onClose={loginModal} />
    </div>
    </div>
  );
};

export default ContactedProperty;
