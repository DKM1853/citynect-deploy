import "./ContactedProperty.css";
import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as fasolidHeart,
  faLocationDot,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { useEffect } from "react";
import CustomCarousel from "./Others/CustomCarousel";
const ListedProperty = ({ user }) => {
  const [listedProperties, setlistedProperties] = useState([]);

  const handleShareClick = async (title, url) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          url: url,
        });
      } else {
        console.log("Web Share API is not supported.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  const toggleBookmark = async (id) => {
    if (!user) {
      alert('Login to save property')  
    }else{ 
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_IP}/user/saved`,
        {
          method: "POST",
          body: JSON.stringify({ id: user.id, propertyId: id }), // Convert object to JSON string
          headers: {
            "Content-Type": "application/json", // Set the correct content type for JSON
          },
        }
      );
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to submit property:", response.status);
      }
    } catch (error) {
      console.error("Error submitting property:", error);
    }}
  };
  useEffect(() => {
    if (user) {
      try {
        fetch(
          `${process.env.REACT_APP_API_IP}/property/${user.id}/ListedProperties`
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            return res.json();
          })
          .then((data) => {
            setlistedProperties(data);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  }, [user]);
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages = 1;
  let visibleData = [];
  visibleData = listedProperties;
  if (listedProperties && listedProperties.length > 10) {
    totalPages = Math.ceil(listedProperties.length / 10);
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    visibleData = listedProperties.slice(startIndex, endIndex);
  }
  const handleToggle = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_IP}/property/toggleStatus/${id}`
    );
    if (response.ok) {
      window.location.reload();
    } else {
      console.log(response);
    }
  };
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
  return (
    <div className="MainContainer">
      <div className="contactedPageMain ">
        <div id="contactedPropertyHeading">
          <h4 className="mt-5">Listed Properties :</h4>
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
                    className={`bookmark-button ShareIcons heart ${
                      user && user.saved_property.includes(property.id)
                        ? "bookmarked"
                        : ""
                    }`}
                    onClick={() => {
                      toggleBookmark(property.id);
                    }}
                  >
                    {!(user && user.saved_property.includes(property.id)) ? (
                      <FontAwesomeIcon icon={faHeart} />
                    ) : (
                      <FontAwesomeIcon icon={fasolidHeart} />
                    )}
                  </span>
                  <span
                    className="ShareIcons"
                    style={{zIndex:"2"}}
                    onClick={() => {
                      handleShareClick(
                        property.title,
                        `/particular-property/${property.id}`
                      );
                    }}
                  >
                    <FontAwesomeIcon icon={faShareFromSquare} />
                  </span>
                </div>
              </div>
              <div className="col-md-6" id="propertyCard-body">
                <Link
                  className="text-decoration-none text-dark"
                  to={`/particular-property/${property.id}`}
                >
                  <div id="card-Heading">{property.title}</div>
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
                      <span className="grey">Status :</span>
                      {!property.isRentedout ? "Available" : "Rent Out"}
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
                        ₹ {property.rent || property.totalRent}
                      </b>{" "}
                      <span className="grey">/per month</span>
                    </div>
                    <div
                      className="col p-0 mobileAndTab-hide "
                      style={{ color: "rgba(0, 0, 0, 0.7)" }}
                    >
                      {" "}
                      <span className="grey">Deposit </span>: {property.deposit}{" "}
                      Rent{" "}
                    </div>
                  </div>
                </Link>
              </div>
              <div className="rounded-4 " id="bottomBar">
                <div className="LaptopHide">
                  <b
                    style={{
                      marginLeft: "2px",
                      fontSize: "20px",
                      color: "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    ₹ {property.rent || property.totalRent}
                  </b>{" "}
                  <span className="grey" style={{ fontSize: "12px" }}>
                    /per month
                  </span>
                </div>
                <div className=" md-fs-5">
                  Property Status :{" "}
                  {property.isVerified ? (
                    !property.isRentedout ? (
                      <span className="text-success fw-bold">Live</span>
                    ) : (
                      <span className="text-danger fw-bold">Rent Out</span>
                    )
                  ) : (
                    <span className="text-warning fw-bold">Under Review</span>
                  )}
                </div>
                <div className="toggle-container ">
                  <p className="toggle-text ms-0">Available</p>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={property.isRentedout}
                      onChange={() => {
                        handleToggle(property.id);
                      }}
                    />
                    <span className="slider"></span>
                  </label>
                  <p className="toggle-text">Rent Out</p>
                </div>
                <div className="grey">
                  To edit listing :{" "}
                  <Link to={'https://wa.me/9316066832'} className="needHelp">

                  <button className="btn btn-outline-primary rounded-pill">
                    Contact Us
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {listedProperties.length > 10 && (
            <div className="paginationBox">
              <Button className="paginationBtn" onClick={goToPreviousPage}>
                {" "}
                <FontAwesomeIcon icon={faArrowLeft} /> Previous{" "}
              </Button>
              <Button className="paginationBtn" onClick={goToNextPage}>
                Next <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListedProperty;
