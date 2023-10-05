import {
  faHeart as fasolidHeart,
  faEllipsisVertical,
  faLocationDot,
  faAngleDown,
  faPhone,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import LoginModal from "./Login.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./Signup.js";
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "./Others/TabSelector.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import "./ParticularProperty.css";
import { Button, Image } from "react-bootstrap";
import { useEffect } from "react";
import Map from "./Others/Map.js";
import CustomCarousel from "./Others/CustomCarousel.js";
const ParticularProperty = ({ user }) => {
  const [signinmodal, setSigninmodal] = useState(false);
  const [loginmodal, setLoginmodal] = useState(false);
  const loginModal = () => setLoginmodal(!loginmodal);
  const signinModal = () => setSigninmodal(!signinmodal);
  const [property, setProperty] = useState();
  const [selectedTab, setSelectedTab] = useTabs([
    "details",
    "amenities",
    "pricing",
  ]);
  const [showReportBlock, setShowReportBlock] = useState(false);
  const toggleReportBlock = () => {
    setShowReportBlock(!showReportBlock);
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
  const toggleBookmark = async (id) => {
    if (!user) {
      signinModal();
    } else {
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
      }
    }
  };
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const [showInstructions, setShowInstructions] = useState(false);
  const [address, setAddress] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_IP}/property/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        const address = {
          coordinates: [
            parseFloat(data.address.latitude) || 23.0225,
            parseFloat(data.address.logitude) || 72.5714,
          ],
          label: data.title,
          link: `/particular-property/${data.id}`,
        };
        setAddress([address]);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, [id]);
  const [properties, setProperties] = useState();
  useEffect(() => {
    if (!property) {
      // Property is not available yet, you can choose to return early or handle it in a different way.
      return;
    }
    fetch(`${process.env.REACT_APP_API_IP}/property/all-paying-guest`)
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter((item) => {
          return (
            item.subtype === property.subtype ||
            item.address.area === property.address.area ||
            (item.rent >= property.rent - 10000 && item.rent <= property.rent + 10000)
          );
        });
        setProperties(filteredData);
      })
      .catch((err) => console.log(err));
  }, [property]);
  const contactOwner = async (id) => {
    if (!user) {
      signinModal();
    } else if (!user.isVerified) {
      signinModal();
    } else {
      if (user.propertyCount > 0) {
        // api to reduce the count for property details
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
            window.location.reload();
          } else {
            console.error("Failed to submit property:", response.status);
          }
        } catch (error) {
          console.error("Error submitting property:", error);
        }
      } else {
        alert("Please Buy Premium");
      }
    }
  };

  const sendmessage = async (id, phone) => {
    if (!user) {
      signinModal();
    } else if (!user.isVerified) {
      signinModal();
    } else {
      if (user.contacted_property.includes(id)) {
        window.location.href = `https://wa.me/${phone}`;
      } else {
        if (user.propertyCount > 0) {
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
              window.location.href = `https://wa.me/${phone}`;
            } else {
              console.error("Failed to submit property:", response.status);
            }
          } catch (error) {
            console.error("Error submitting property:", error);
          }
        } else {
          alert("Please Buy Premium");
        }
      }
    }
  };
  const handleShareClick = async (title, url) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          url: url,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        console.log("Web Share API is not supported.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  if (!property) {
    return <p>Loading...</p>; // You can show a loading message or spinner
  }
  if (!properties) {
    return <p>Loading...</p>; // You can show a loading message or spinner
  }

  return (
    <div className="bg-lightblue">
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
      <div className="container py-4">
        <div id="property-heading" className="row">
          <h2 id="addressHeading" className=" col-lg-8 col-sm-12">
            {property.title} {property.address.pincode}
          </h2>
          <div className=" col-lg-2 flex justify-content-around" id="IconGroup">
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
            <span className="ShareIcons">
              <FontAwesomeIcon
                icon={faShareFromSquare}
                style={{ zIndex: "2" }}
                onClick={() => {
                  handleShareClick(
                    property.title,
                    `/particular-property/${property.id}`
                  );
                }}
              />
            </span>
            <span
              className="ShareIcons"
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
                <h6 className="text-center">Report Property </h6>
                <ul>
                  <li
                    role="button"
                    onClick={() => {
                      reportProperty("Rent Out", property.id, property.ownerId);
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
        </div>
        <div id="propertyPhotos" className="row mobileAndTab-hide">
          <div className="col-md-9 col-8 " style={{ maxHeight: "500px" }}>
            <img
              src={property.photoUrls[0] || ""}
              onClick={() => openImageViewer(0)}
              alt="photos"
              width={"100%"}
              height={"500px"}
            />
          </div>
          <div
            className="col-md-3 col-4 "
            id="SecondaryImageBox"
            style={{ maxHeight: "500px" }}
          >
            <div className="mobileAndTab-hide ">
              <img
                src={property.photoUrls[1] || ""}
                onClick={() => openImageViewer(1)}
                alt="photos"
                width={"100%"}
                height={"100%"}
              />
            </div>
            <span className="my-2"></span>
            <div className="">
              <div
                style={{
                  position: "relative",
                  height: "100%",
                }}
              >
                <img
                  src={property.photoUrls[2]}
                  alt="property "
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onClick={() => openImageViewer(2)}
                />
                {property.photoUrls.length > 3 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity as needed
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white", // Text color
                      fontSize: "24px", // Text font size
                    }}
                    onClick={() => openImageViewer(3)}
                  >
                    +{property.photoUrls.length - 3} More
                  </div>
                )}
              </div>
            </div>
          </div>

          {isViewerOpen && (
            <ImageViewer
              src={property.photoUrls}
              currentIndex={currentImage}
              onClose={closeImageViewer}
              disableScroll={true}
              backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
                height: "90%",
                top: "10%",
              }}
              closeOnClickOutside={true}
            />
          )}
        </div>
        <div className="LaptopHide">
          <CustomCarousel photoUrls={property.photoUrls} />
          <div id="iconBox" className="LaptopHide">
            <span
              className={`bookmark-button ShareIcons heart ${
                user &&
                user.saved_property &&
                user.saved_property.includes(property.id)
                  ? "bookmarked"
                  : ""
              }`}
              onClick={() => {
                toggleBookmark(property.id);
              }}
            >
              {user &&
              user.saved_property &&
              user.saved_property.includes(property.id) ? (
                <FontAwesomeIcon icon={fasolidHeart} />
              ) : (
                <FontAwesomeIcon icon={faHeart} />
              )}
            </span>
            <span
              className="ShareIcons"
              style={{ zIndex: "2" }}
              onClick={() => {
                handleShareClick(
                  property.title,
                  `/particular-property/${property.id}`
                );
              }}
            >
              <FontAwesomeIcon icon={faShareFromSquare} />
            </span>
            <span
              className="ShareIcons"
              onClick={toggleReportBlock}
              style={{ zIndex: "2" }}
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </span>
            {showReportBlock && (
              <div className="reportBlock">
                <h6 className="text-center d-flex justify-content-around">
                  Report Property{" "}
                  <FontAwesomeIcon onClick={toggleReportBlock} icon={faClose} />
                </h6>
                <ul>
                  <li
                    role="button"
                    onClick={() => {
                      reportProperty("Rent Out", property.id, property.ownerId);
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
        </div>
        <div id="propertyDetails" className="row">
          <div className="col-md-8">
            <div className="detailsBox mobileAndTab-hide">
              <div className="boxHeader"> Property Details :</div>
              <div className="row innerDetailsBox">
                <div className="col-md">
                  <div className="SingleDetailBox">
                    <div className="labelTextForDetail">Description:</div>
                    <div className="valueTextForDetail">
                      {property.type}, {property.bedroom} Bedrooms,{" "}
                      {property.bathroom} Bathrooms
                    </div>
                  </div>
                  <div className="SingleDetailBox">
                    <div className="labelTextForDetail">Property Type:</div>
                    <div className="valueTextForDetail">{property.subtype}</div>
                  </div>
                  <div className="SingleDetailBox">
                    <div className="labelTextForDetail">Furnishing :</div>
                    <div className="valueTextForDetail">
                      {property.furnishedType}
                    </div>
                  </div>
                  {property.type === "pg" && (
                    <div className="SingleDetailBox">
                      <div className="labelTextForDetail">
                        Withfood option :
                      </div>
                      <div className="valueTextForDetail">
                        {property.withoutFood === true ? "Yes" : "No"}
                      </div>
                    </div>
                  )}
                  {property.type === "sharing flat" && (
                    <div className="SingleDetailBox">
                      <div className="labelTextForDetail">
                        No of People Currently Living:
                      </div>
                      <div className="valueTextForDetail">
                        {property.currentlyLiving}
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-md">
                  <div className="SingleDetailBox">
                    <div className="labelTextForDetail">Available From :</div>
                    <div className="valueTextForDetail">
                      {property.availableFrom}
                    </div>
                  </div>
                  <div className="SingleDetailBox">
                    <div className="labelTextForDetail">Available For :</div>
                    <div className="valueTextForDetail">
                      {property.memberedAllowed}
                    </div>
                  </div>
                  {property.type === "pg" && (
                    <div className="SingleDetailBox">
                      <div className="labelTextForDetail">Available in:</div>
                      <div className="valueTextForDetail">
                        {property.sharing === "1" && "Single Sharing"}
                        {property.sharing === "2" && "Double Sharing"}
                        {property.sharing === "3" && "3 Sharing"}
                        {property.sharing === "4+" && "4+ Sharing"}
                      </div>
                    </div>
                  )}
                  {property.type === "sharing flat" && (
                    <div className="SingleDetailBox">
                      <div className="labelTextForDetail">
                        No of Vacancy Available:
                      </div>
                      <div className="valueTextForDetail">
                        {property.vacancyAvailable}
                      </div>
                    </div>
                  )}
                  <div className="SingleDetailBox">
                    <div className="labelTextForDetail">Non-Veg allowed :</div>
                    <div className="valueTextForDetail">
                      {property.nonVegAllowed === false ? "No" : "Yes"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="detailsBox mobileAndTab-hide">
              <div className="boxHeader"> Amenities :</div>
              <div className="innerDetailsBox d-flex flex-wrap">
                {property.amenities.includes("electricity") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/electricity.svg"
                      alt="Amenities"
                    />
                    <span>Electricity</span>
                  </div>
                )}
                {property.amenities.includes("tv") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/tv-license.svg"
                      alt="Amenities"
                    />
                    <span>T.V.</span>
                  </div>
                )}
                {property.amenities.includes("2-wheeler-parking") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/parking-area.png"
                      alt="Amenities"
                    />
                    <span>Parking</span>
                  </div>
                )}
                {property.amenities.includes("free-wifi") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/wifi.svg"
                      alt="Amenities"
                    />
                    <span>Free Wifi</span>
                  </div>
                )}
                {property.amenities.includes("cooking") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/cooking.svg"
                      alt="Amenities"
                    />
                    <span>Cooking</span>
                  </div>
                )}
                {property.amenities.includes("house-keeping") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/housekeeping.webp"
                      alt="Amenities"
                    />
                    <span>House Keeping</span>
                  </div>
                )}
                {property.amenities.includes("laundry") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/laundry.png"
                      alt="Amenities"
                    />
                    <span>Laundry</span>
                  </div>
                )}
                {property.amenities.includes("fridge") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/fridge.svg"
                      alt="Amenities"
                    />
                    <span>Fridge</span>
                  </div>
                )}
                {property.amenities.includes("ro-water") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/ro-water.png"
                      alt="Amenities"
                    />
                    <span>R.O. Water</span>
                  </div>
                )}
                {property.amenities.includes("24*7-water") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/water-included.svg"
                      alt="Amenities"
                    />
                    <span>24*7 Water</span>
                  </div>
                )}
                {property.amenities.includes("air-conditioner") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/air-conditioner.png"
                      alt="Amenities"
                    />
                    <span>A.C.</span>
                  </div>
                )}
                {property.amenities.includes("breakfast") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/breakfast.png"
                      alt="Amenities"
                    />
                    <span>Breakfast</span>
                  </div>
                )}
                {property.amenities.includes("gyser") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/gyser.png"
                      alt="Amenities"
                    />
                    <span>Gyser</span>
                  </div>
                )}
                {property.amenities.includes("lunch") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/lunch.png"
                      alt="Amenities"
                    />
                    <span>Lunch</span>
                  </div>
                )}
                {property.amenities.includes("security") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/security.svg"
                      alt="Amenities"
                    />
                    <span>Security</span>
                  </div>
                )}
                {property.amenities.includes("microwave") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/microwave.png"
                      alt="Amenities"
                    />
                    <span>Microwave</span>
                  </div>
                )}
                {property.amenities.includes("fans") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/fan.png"
                      alt="Amenities"
                    />
                    <span>Fans</span>
                  </div>
                )}
                {property.amenities.includes("wardrobe") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/wardrobe.png"
                      alt="Amenities"
                    />
                    <span>Wardrobe</span>
                  </div>
                )}
                {property.amenities.includes("cctv") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/cctv.svg"
                      alt="Amenities"
                    />
                    <span>C.C.T.V.</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex border-b border-gray-300 LaptopHide">
              <TabSelector
                isActive={selectedTab === "details"}
                onClick={() => setSelectedTab("details")}
              >
                Details
              </TabSelector>
              <TabSelector
                isActive={selectedTab === "amenities"}
                onClick={() => setSelectedTab("amenities")}
              >
                Amenities
              </TabSelector>
              <TabSelector
                isActive={selectedTab === "pricing"}
                onClick={() => setSelectedTab("pricing")}
              >
                Pricing
              </TabSelector>
            </div>
            <div className="LaptopHide">
              <TabPanel hidden={selectedTab !== "details"}>
                <div className="detailsBox">
                  <div className="row innerDetailsBox">
                    <div className="col-md">
                      <div className="SingleDetailBox row">
                        <div className="labelTextForDetail col-5">
                          Description
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail col-6">
                          {property.type}, {property.bedroom} Bedrooms,{" "}
                          {property.bathroom} Bathrooms
                        </div>
                      </div>
                      <div className="SingleDetailBox row">
                        <div className="labelTextForDetail col-5">
                          Property Type
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail col-6">
                          {property.subtype}
                        </div>
                      </div>
                      <div className="SingleDetailBox row">
                        <div className="labelTextForDetail col-5">
                          Furnishing{" "}
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail col-6">
                          {property.furnishedType}
                        </div>
                      </div>
                      {property.type === "pg" && (
                        <div className="SingleDetailBox row">
                          <div className="labelTextForDetail col-5">
                            Withfood option{" "}
                          </div>
                          <div className="col-1">:</div>
                          <div className="valueTextForDetail col-6">
                            {property.withoutFood === true ? "Yes" : "No"}
                          </div>
                        </div>
                      )}
                      {property.type === "sharing flat" && (
                        <div className="SingleDetailBox row">
                          <div className="labelTextForDetail col-5">
                            No of People Currently Living
                          </div>
                          <div className="col-1">:</div>
                          <div className="valueTextForDetail col-6">
                            {property.currentlyLiving}
                          </div>
                        </div>
                      )}
                      {property.type === "pg" && (
                        <div className="SingleDetailBox row">
                          <div className="labelTextForDetail col-5">
                            Available In
                          </div>
                          <div className="col-1">:</div>
                          <div className="valueTextForDetail col-6">
                            {property.sharing === "1" && "Single Sharing"}
                            {property.sharing === "2" && "Double Sharing"}
                            {property.sharing === "3" && "3 Sharing"}
                            {property.sharing === "4+" && "4+ Sharing"}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-md">
                      <div className="SingleDetailBox row">
                        <div className="labelTextForDetail col-5">
                          Available From
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail col-6">
                          {property.availableFrom}
                        </div>
                      </div>
                      <div className="SingleDetailBox row">
                        <div className="labelTextForDetail col-5">
                          Available For
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail col-6">
                          {property.memberedAllowed}
                        </div>
                      </div>
                      {property.type === "sharing flat" && (
                        <div className="SingleDetailBox row">
                          <div className="labelTextForDetail col-5">
                            No of Vacancy Available
                          </div>
                          <div className="col-1">:</div>
                          <div className="valueTextForDetail col-6">
                            {property.vacancyAvailable}
                          </div>
                        </div>
                      )}
                      <div className="SingleDetailBox row">
                        <div className="labelTextForDetail col-5">
                          Non-Veg allowed
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail col-6">
                          {property.nonVegAllowed ? "Yes" : "No"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel hidden={selectedTab !== "amenities"}>
                <div className="detailsBox">
                  <div className="innerDetailsBox d-flex  flex-wrap">
                    <div className="amenitiesBox">
                      {property.amenities.includes("electricity") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/electricity.svg"
                            alt="Amenities"
                          />
                          <span>Electricity</span>
                        </div>
                      )}
                      {property.amenities.includes("tv") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/tv-license.svg"
                            alt="Amenities"
                          />
                          <span>T.V.</span>
                        </div>
                      )}
                      {property.amenities.includes("2-wheeler-parking") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/parking-area.png"
                            alt="Amenities"
                          />
                          <span>Parking</span>
                        </div>
                      )}
                      {property.amenities.includes("free-wifi") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/wifi.svg"
                            alt="Amenities"
                          />
                          <span>Free Wifi</span>
                        </div>
                      )}
                      {property.amenities.includes("cooking") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/cooking.svg"
                            alt="Amenities"
                          />
                          <span>Cooking</span>
                        </div>
                      )}
                      {property.amenities.includes("house-keeping") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/housekeeping.webp"
                            alt="Amenities"
                          />
                          <span>House Keeping</span>
                        </div>
                      )}
                      {property.amenities.includes("laundry") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/laundry.png"
                            alt="Amenities"
                          />
                          <span>Laundry</span>
                        </div>
                      )}
                      {property.amenities.includes("fridge") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/fridge.svg"
                            alt="Amenities"
                          />
                          <span>Fridge</span>
                        </div>
                      )}
                      {property.amenities.includes("ro-water") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/ro-water.png"
                            alt="Amenities"
                          />
                          <span>R.O. Water</span>
                        </div>
                      )}
                      {property.amenities.includes("24*7-water") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/water-included.svg"
                            alt="Amenities"
                          />
                          <span>24*7 Water</span>
                        </div>
                      )}
                      {property.amenities.includes("air-conditioner") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/air-conditioner.svg"
                            alt="Amenities"
                          />
                          <span>A.C.</span>
                        </div>
                      )}
                      {property.amenities.includes("breakfast") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/breakfast.png"
                            alt="Amenities"
                          />
                          <span>Breakfast</span>
                        </div>
                      )}
                      {property.amenities.includes("gyser") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/gyser.png"
                            alt="Amenities"
                          />
                          <span>Gyser</span>
                        </div>
                      )}
                      {property.amenities.includes("lunch") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/lunch.png"
                            alt="Amenities"
                          />
                          <span>Lunch</span>
                        </div>
                      )}
                      {property.amenities.includes("security") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/security.svg"
                            alt="Amenities"
                          />
                          <span>Security</span>
                        </div>
                      )}
                      {property.amenities.includes("microwave") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/microwave.png"
                            alt="Amenities"
                          />
                          <span>Microwave</span>
                        </div>
                      )}
                      {property.amenities.includes("fans") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/fan.png"
                            alt="Amenities"
                          />
                          <span>Fans</span>
                        </div>
                      )}
                      {property.amenities.includes("wardrobe") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/wardrobe.png"
                            alt="Amenities"
                          />
                          <span>Wardrobe</span>
                        </div>
                      )}
                      {property.amenities.includes("cctv") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/cctv.svg"
                            alt="Amenities"
                          />
                          <span>C.C.T.V.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel hidden={selectedTab !== "pricing"}>
                <div className="detailsBox ">
                  <div className="innerDetailsBox">
                    <div className="bg-white rounded-2 my-1">
                      <div className="row align-items-center">
                        <div className="col-7 pricingLabel ">
                          {" "}
                          Rent (Per Month)
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail  fw-bold  col-4">
                          {" "}
                          {property.rent}
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2 my-1">
                      <div className="row align-items-center">
                        <div className="col-7 pricingLabel">
                          {" "}
                          Deposit (in months)
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail fw-bold  col-4">
                          {" "}
                          {property.depoist} rent
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2 my-2">
                      <div className="row align-items-center">
                        <div className="col-7 grey fs-6 pricingLabel">
                          {" "}
                          Additional Cost
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail fs-6 grey col-4">
                          {" "}
                          {property.additionalCosts.cost1 ? "Yes" : "No"}
                        </div>
                      </div>
                      {property.additionalCosts.description1 &&
                        property.additionalCosts.cost1 && (
                          <div className="row align-items-center">
                            <div className="col-7  pricingLabel">
                              {" "}
                              {property.additionalCosts.description1}
                            </div>
                            <div className="col-1">:</div>
                            <div className="valueTextForDetail  col-4">
                              {" "}
                              {property.additionalCosts.cost1}
                            </div>
                          </div>
                        )}
                      {property.additionalCosts.description2 &&
                        property.additionalCosts.cost2 && (
                          <div className="row align-items-center">
                            <div className="col-7  pricingLabel">
                              {" "}
                              {property.additionalCosts.description2}
                            </div>
                            <div className="col-1">:</div>
                            <div className="valueTextForDetail  col-4">
                              {" "}
                              {property.additionalCosts.cost2}
                            </div>
                          </div>
                        )}
                      {property.additionalCosts.description3 &&
                        property.additionalCosts.cost3 && (
                          <div className="row align-items-center">
                            <div className="col-7  pricingLabel">
                              {" "}
                              {property.additionalCosts.description3}
                            </div>
                            <div className="col-1">:</div>
                            <div className="valueTextForDetail  col-4">
                              {" "}
                              {property.additionalCosts.cost3}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </TabPanel>
            </div>
            {property.instructions && (
              <>
                {" "}
                <div className="detailsBox mobileAndTab-hide">
                  <div className="boxHeader">
                    {" "}
                    Instructions / rules or regulations:
                  </div>
                  <div className="innerDetailsBox grey">
                    {property.instructions}
                  </div>
                </div>
                <div className="detailsBox LaptopHide">
                  <span
                    className="text-primary"
                    role="button"
                    onClick={() => {
                      setShowInstructions(!showInstructions);
                    }}
                  >
                    {showInstructions ? (
                      <div className="grey p-3">
                        {" "}
                        Instructions / rules or regulations{" "}
                        <FontAwesomeIcon icon={faAngleDown} />
                      </div>
                    ) : (
                      <div className="grey p-3">
                        {" "}
                        Instructions / rules or regulations{" "}
                        <FontAwesomeIcon icon={faAngleDown} />
                      </div>
                    )}
                  </span>
                  {showInstructions && (
                    <div className="innerDetailsBox grey">
                      {property.instructions}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="col-md-4">
            <div className="detailsBox">
              <div className="boxHeader"> Address:</div>
              <div className="innerDetailsBox">
                <div className="">
                  {" "}
                  <FontAwesomeIcon className="grey" icon={faLocationDot} />
                  {property.address.houseno}, {property.address.streetAddress}{" "}
                  {property.address.area} {property.address.pincode}{" "}
                </div>
                <div className="mapBox mt-3">
                  <Map addresses={address} height={"300px"} />
                </div>
              </div>
            </div>
            <div className="detailsBox mobileAndTab-hide">
              <div className="boxHeader"> Pricing :</div>
              <div className="detailsBox ">
                <div className="innerDetailsBox">
                  <div className="bg-white rounded-2 my-1">
                    <div className="row align-items-center">
                      <div className="col-7 pricingLabel ">
                        {" "}
                        Rent (Per Month)
                      </div>
                      <div className="col-1">:</div>
                      <div className="valueTextForDetail  fw-bold  col-4">
                        {" "}
                        {property.rent || property.totalFlatRent}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2 my-1">
                    <div className="row align-items-center">
                      <div className="col-7 pricingLabel">
                        {" "}
                        Deposit (in months)
                      </div>
                      <div className="col-1">:</div>
                      <div className="valueTextForDetail fw-bold  col-4">
                        {property.depoist} rent
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2 my-2">
                    <div className="row align-items-center">
                      <div className="col-7 grey fs-6 pricingLabel">
                        {" "}
                        Additional Cost
                      </div>
                      <div className="col-1">:</div>
                      <div className="valueTextForDetail fs-6 grey col-4">
                        {" "}
                        {property.additionalCosts.cost1 ? "Yes" : "No"}
                      </div>
                    </div>
                    {property.additionalCosts.description1 &&
                      property.additionalCosts.cost1 && (
                        <div className="row align-items-center">
                          <div className="col-7  pricingLabel">
                            {" "}
                            {property.additionalCosts.description1}
                          </div>
                          <div className="col-1">:</div>
                          <div className="valueTextForDetail  col-4">
                            {" "}
                            {property.additionalCosts.cost1}
                          </div>
                        </div>
                      )}
                    {property.additionalCosts.description2 &&
                      property.additionalCosts.cost2 && (
                        <div className="row align-items-center">
                          <div className="col-7  pricingLabel">
                            {" "}
                            {property.additionalCosts.description2}
                          </div>
                          <div className="col-1">:</div>
                          <div className="valueTextForDetail  col-4">
                            {" "}
                            {property.additionalCosts.cost2}
                          </div>
                        </div>
                      )}
                    {property.additionalCosts.description3 &&
                      property.additionalCosts.cost3 && (
                        <div className="row align-items-center">
                          <div className="col-7  pricingLabel">
                            {" "}
                            {property.additionalCosts.description3}
                          </div>
                          <div className="col-1">:</div>
                          <div className="valueTextForDetail  col-4">
                            {" "}
                            {property.additionalCosts.cost3}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className="detailsBox">
              <div className="boxHeader"> Contact Owner :</div>
              <div className="innerDetailsBox">
                <div className="labelTextForDetail">Owner:</div>
                <div className="fs-6">{property.name}</div>
                <div className="d-flex flex-column">
                  <Button
                    className="rounded-pill"
                    id="contactOwner-pp"
                    onClick={() => {
                      contactOwner(property.id);
                    }}
                  >
                    {user &&
                    user.contacted_property &&
                    user.contacted_property.includes(property.id) ? (
                      <>
                        <FontAwesomeIcon icon={faPhone} /> {property.phone}
                      </>
                    ) : (
                      "Contact Owner"
                    )}
                  </Button>
                  <Button
                    className="rounded-pill"
                    id="sendMessage-pp"
                    onClick={() => {
                      sendmessage(property.id, property.phone);
                    }}
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="similarPropertyHeading">
          <Signup isOpen={signinmodal} onClose={signinModal} />
          <LoginModal isOpen={loginmodal} onClose={loginModal} />
          <h3 className="mt-5">Similar Properties :</h3>
        </div>
        <div className="featuresRow">
          {properties.map(
            (property, index) =>
              index < 10 && (
                <div className="card propertyCard " key={index}>
                  <Link
                    to={`/particular-property/${property.id}`}
                    className="text-decoration-none text-dark"
                  >
                    <Image
                      src={property.photoUrls[0]}
                      className="card-img-top"
                      width={"300px"}
                      height={"156px"}
                      alt="..."
                    />
                    <div className="card-body">
                      <h6 className="card-title ">
                        {" "}
                        <b>
                          {property.title.length > 30
                            ? `${property.title.substring(0, 30)}...`
                            : property.title}
                        </b>
                      </h6>
                      <p className="card-text">
                        {property.address.area &&
                          property.address.area.charAt(0).toUpperCase() +
                            property.address.area.slice(1)}
                      </p>
                      <p className="card-text text-bold">
                        ₹{property.rent || property.totalFlatRent} |{" "}
                        {property.furnishedType &&
                          property.furnishedType.charAt(0).toUpperCase() +
                            property.furnishedType.slice(1)}
                      </p>
                    </div>
                  </Link>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticularProperty;
