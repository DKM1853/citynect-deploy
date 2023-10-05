import "./PayingGuest.css";
import { FormGroup, Form } from "react-bootstrap";
import { React, useEffect, useState } from "react";
import LoginModal from "./Login.js";
import Signup from "./Signup.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faHeart as fasolidHeart,
  faEllipsisVertical,
  faLocationDot,
  faMagnifyingGlass,
  faFilter,
  faArrowRight,
  faArrowLeft,
  faClose,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { Input, Label, Button } from "reactstrap";
import MapContainer from "./Others/Map";
import CustomCarousel from "./Others/CustomCarousel";
const PayingGuest = (props) => {
  const { user } = props;
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [locationFilter, setLocationFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState(50000);
  const [genderFilter, setGenderFilter] = useState("");
  const [occupancyFilter, setOccupancyFilter] = useState("Any");
  const [furnishedFilter, setFurnishedFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  useEffect(() => {
    // Update the URL when locationFilter changes
    const url = new URL(window.location.href);
    url.searchParams.set("location", locationFilter);
    window.history.pushState({}, "", url);

    applyFilters();
    // eslint-disable-next-line
  }, [locationFilter]);
  useEffect(() => {
    // Update the URL when budgetFilter changes
    const url = new URL(window.location.href);
    url.searchParams.set("budget", budgetFilter);
    window.history.pushState({}, "", url);

    applyFilters();
    // eslint-disable-next-line
  }, [budgetFilter]);
  useEffect(() => {
    // Update the URL when budgetFilter changes
    const url = new URL(window.location.href);
    url.searchParams.set("gender", genderFilter);
    window.history.pushState({}, "", url);

    applyFilters();
    // eslint-disable-next-line
  }, [genderFilter]);
  useEffect(() => {
    // Update the URL when budgetFilter changes
    const url = new URL(window.location.href);
    url.searchParams.set("furnished", furnishedFilter);
    window.history.pushState({}, "", url);

    applyFilters();
    // eslint-disable-next-line
  }, [furnishedFilter]);
  useEffect(() => {
    // Update the URL when budgetFilter changes
    const url = new URL(window.location.href);
    url.searchParams.set("availability", availabilityFilter);
    window.history.pushState({}, "", url);

    applyFilters();
    // eslint-disable-next-line
  }, [availabilityFilter]);
  useEffect(() => {
    // Update the URL when budgetFilter changes
    const url = new URL(window.location.href);
    url.searchParams.set("occupancy", occupancyFilter);
    window.history.pushState({}, "", url);

    applyFilters();
    // eslint-disable-next-line
  }, [occupancyFilter]);
  const calculateDaysBetweenDates = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return (date2 - date1) / oneDay;
  };
  const applyFilters = () => {
    const filtered = properties.filter((property) => {
      let locationMatches = {};
      if (locationFilter === "All" || locationFilter ==="all") {
        locationMatches = true;
      } else {
        const lowercaseArea = property.address.area.toLowerCase();
        locationMatches = lowercaseArea.includes(locationFilter);
      }
      const budgetMatches = property.rent <= parseInt(budgetFilter);
      let genderMatches = true;
      if (genderFilter !== "" && genderFilter) {
        genderMatches = property.memberedAllowed === genderFilter;
      }
      let occupancyMatches = true;
      if (occupancyFilter === "Any") {
        occupancyMatches = true;
      } else {
        occupancyMatches = property.sharing.includes(occupancyFilter);
      }
      let furnishedMatches = true;
      if (furnishedFilter) {
        furnishedMatches = property.furnishedType === furnishedFilter;
      }
      let availabilityMatches = true;
      const currentDate = new Date();
      const propertyAvailability = new Date(property.availableFrom);
      switch (availabilityFilter) {
        case "0":
          availabilityMatches =
            calculateDaysBetweenDates(currentDate, propertyAvailability) <= 5;
          break;
        case "1":
          const days = calculateDaysBetweenDates(
            currentDate,
            propertyAvailability
          );
          availabilityMatches = days <= 30;
          break;
        case "2":
          const day = calculateDaysBetweenDates(
            currentDate,
            propertyAvailability
          );
          availabilityMatches = day > 30 && day <= 60;
          break;
        default:
          availabilityMatches = true;
      }
      return (
        locationMatches &&
        budgetMatches &&
        genderMatches &&
        occupancyMatches &&
        furnishedMatches &&
        availabilityMatches
      );
    });
    setFilteredProperties(filtered);
  };
  const handleLocationChange = (value) => {
    setLocationFilter(value.toLowerCase());
    applyFilters();
  };
  const handleBudgetChange = (event) => {
    setBudgetFilter(parseInt(event.target.value));
    applyFilters();
  };
  const handleGenderChange = (value) => {
    setGenderFilter(value);
    applyFilters();
  };
  const handleOccupancyChange = (value) => {
    setOccupancyFilter(value);
    applyFilters();
  };
  const handleFurnishedChange = (value) => {
    setFurnishedFilter(value);
    applyFilters();
  };
  const handleAvailabilityChange = (value) => {
    setAvailabilityFilter(value);
    applyFilters();
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_IP}/property/all-paying-guest`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setFilteredProperties(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [listView, setListView] = useState(false);
  const handleToggle = () => { 
    setListView(!listView);
  };
  // const [moreFilters, setMoreFilters] = useState(false);
  // const toggleSection = () => {
  //   setMoreFilters(!moreFilters);
  // };
  const toggleBookmark = async (id) => {
    if (!user) {
      loginModal()   
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
  const locations = [
    { value: "all", label: "All" },
    { value: "bodakdev", label: "Bodakdev" },
    { value: "shaymal", label: "Shaymal" },
    { value: "satellite", label: "Satellite" },
    { value: "prahalad nagar", label: "Prahalad Nagar" },
    { value: "paldi", label: "Paldi" },
    { value: "ambawadi", label: "Ambawadi" },
  ];
  const gender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "both", label: "Both" },
  ];
  const Ocupancy = [
    { value: "1", label: "Single" },
    { value: "2", label: "Double" },
    { value: "Any", label: "Any" },
  ];
  const Furnished = [
    { value: "fully-furnished", label: "Furnished" },
    { value: "unfurnished", label: "Unfurnished" },
    { value: "semi-furnished", label: "Semi-furnished" },
  ];
  const Availability = [
    { value: "0", label: "Immediately" },
    { value: "1", label: "Within 1 Month" },
    { value: "2", label: "1-2 Months" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages = 1;
  let visibleData = filteredProperties;
  if (filteredProperties.length && filteredProperties.length > 10) {
    totalPages = Math.ceil(filteredProperties.length / 10);
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    visibleData = filteredProperties.slice(startIndex, endIndex);
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
  const [addresses, setAddresses] = useState();
  useEffect(() => {
    const addresses = filteredProperties.map((property) => ({      
      label: property.title,
      link: `/particular-property/${property.id}`,
      coordinates: [  
        parseFloat(property.address.latitude) ,
        parseFloat(property.address.logitude) ,
      ],
    }));
    setAddresses(addresses);
  }, [filteredProperties]);
  const contactOwner = async (id) => {
    if (!user) {
      signinModal(); 
    } 
    else if (!user.isVerified){
      signinModal();
    }else {
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
    }
    else if (!user.isVerified){
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
  const [loginmodal, setLoginmodal] = useState(false);
  const [filterBar, setFilterBar] = useState();
  const filterModal = () => setFilterBar(!filterBar);
  const [signinmodal, setSigninmodal] = useState(false);
  const loginModal = () => setLoginmodal(!loginmodal);
  const signinModal = () => setSigninmodal(!signinmodal);
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
    <div className="main">
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
      <div className="header">
        {/* Search Bar */}
        <h6 className="resultCount">
          Search Result for properties in "
          {locationFilter === "all" ? "Ahmedabad" : locationFilter}"{" "}
          {filteredProperties.length} Result found{" "}
        </h6>
        <div className="toggle-container">
          <p className="toggle-text"> List View</p>
          <label className="toggle-switch">
            <input type="checkbox" checked={listView} onChange={handleToggle} />
            <span className="slider"></span>
          </label>
          <p className="toggle-text">Map View</p>
        </div>
      </div>
      <div id="mobileviewHeader">
        <div  className="toggle-container">
          <p className="toggle-text"> List View</p>
          <label className="toggle-switch">
            <input type="checkbox" checked={listView} onChange={handleToggle} />
            <span className="slider"></span>
          </label>
          <p className="toggle-text">Map View</p>
        </div>
        <div className="search-sortBar">
        <div  className="mobilview-search-bar shadow-sm  rounded-pill">
          <div className="mobileview-search-icon">
            <FontAwesomeIcon icon={faLocationDot} />
          </div>
          <input
            type="text"
            id="searchInput"
            placeholder="Search for location"
            value={locationFilter}
            onChange={(e) => {
              handleLocationChange(e.target.value);
            }}
          />
          <button className="mobileview-search-button rounded-pill">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className="sortButton rounded" onClick={filterModal}>
          <FontAwesomeIcon icon={faFilter} />
        </div>
        </div>
      </div>
      <div className="row justify-content-center">
        {/* Filter Bar */}
        <div className=" col-md-3" id="filterBar">
          <Form>
            <FormGroup>
              <Label for="location">Location :</Label>
              <Input
                id="location"
                placeholder="search..."
                value={locationFilter}
                onChange={(e) => {
                  handleLocationChange(e.target.value);
                }}
              />
              <div className="location-groups mt-2">
                {locations.map((button) => (
                  <div
                    key={button.value}
                    className={`location-button rounded-pill ${
                      locationFilter === button.value ? "selected" : ""
                    }`}
                    value={locationFilter}
                    onClick={() => {
                      handleLocationChange(button.value);
                    }}
                  >
                    {button.label}
                  </div>
                ))}
              </div>
            </FormGroup>
            <FormGroup className="mt-3">
              <Label for="budget">Budget :</Label>
              <div className="range-bar">
                <input
                  type="range"
                  className="range-input"
                  min="5000"
                  max="50000"
                  value={budgetFilter}
                  step="1000"
                  onChange={handleBudgetChange}
                />
              </div>
              <div className="range-labels">
                <span>5k</span>
                <span>15k</span>
                <span>25k</span>
                <span>35k</span>
                <span>50k</span>
              </div>
            </FormGroup>
            <FormGroup className="mt-3">
              <Label>Gender :</Label>
              <div className="location-groups">
                {gender.map((button) => (
                  <div
                    key={button.value}
                    className={`location-button rounded-pill ${
                      genderFilter === button.value ? "selected" : ""
                    }`}
                    value={genderFilter}
                    onClick={() => {
                      handleGenderChange(button.value);
                    }}
                  >
                    {button.label}
                  </div>
                ))}
              </div>
            </FormGroup>
            <FormGroup className="mt-3">
              <Label>Ocupancy Type :</Label>
              <div className="location-groups">
                {Ocupancy.map((button) => (
                  <div
                    key={button.value}
                    className={`location-button rounded-pill ${
                      occupancyFilter === button.value ? "selected" : ""
                    }`}
                    value={locationFilter}
                    onClick={() => {
                      handleOccupancyChange(button.value);
                    }}
                  >
                    {button.label}
                  </div>
                ))}
              </div>
            </FormGroup>
            <FormGroup className="mt-3">
              <Label>Furnished Type :</Label>
              <div className="location-groups">
                {Furnished.map((button) => (
                  <div
                    key={button.value}
                    className={`location-button rounded-pill ${
                      furnishedFilter === button.value ? "selected" : ""
                    }`}
                    value={furnishedFilter}
                    onClick={() => {
                      handleFurnishedChange(button.value);
                    }}
                  >
                    {button.label}
                  </div>
                ))}
              </div>
            </FormGroup>
            <FormGroup className="mt-3">
              <Label>Availability :</Label>
              <div className="location-groups">
                {Availability.map((button) => (
                  <div
                    key={button.value}
                    className={`location-button rounded-pill ${
                      availabilityFilter === button.value ? "selected" : ""
                    }`}
                    value={availabilityFilter}
                    onClick={() => {
                      handleAvailabilityChange(button.value);
                    }}
                  >
                    {button.label}
                  </div>
                ))}
              </div>
            </FormGroup>
          </Form>
        </div>
        {/* Main Contain */}
        <div className="mainContain py-2 col-md-8">
          {!listView ? (
            <div className="mb-3 " style={{ maxWidth: "100%" }}>
              {visibleData.length === 0 && (
                <div className="text-center fs-4">No Result Found</div>
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
                      <div id="card-Heading">
                          {property.title.length > 40
                            ? `${property.title.substring(0, 40)}...`
                            : property.title}
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
                        className={`bookmark-button heart ${
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
                        className="ShareIcons this"
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
                    <Button
                      id="contact-owner"
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
                      className=" mobileAndTab-hide"
                      id="send-message"
                      onClick={() => {
                        sendmessage(property.id, property.phone);
                      }}
                    >
                      Send Message
                    </Button>
                    <Link to={'https://wa.me/9316066832'} className="needHelp">Need Help?</Link>
                  </div>
                </div>
              ))}
              {filteredProperties.length > 10 && (
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
          ) : (
            <div >
              {visibleData.length === 0 ? (
                  <div className="text-center fs-4">No Result Found</div>
              ):
              <MapContainer addresses={addresses}  height={"80vh"}/>
              }
            </div>
          )}
          <Signup isOpen={signinmodal} onClose={signinModal} />
          <LoginModal isOpen={loginmodal} onClose={loginModal} />
          {/* Filter bar for mobile view */}
          <div className={`filter-modal ${filterBar ? "open" : ""}`}>
            <div className="modal-content">
              <Form>
                <div className="p-3 d-flex flex-column">
                  <div className="closeBox">
                    <span className="close" onClick={filterModal}>
                      <FontAwesomeIcon icon={faClose} />
                    </span>
                  </div>
                  <div className=" col-md-3" id="filterBarMobileview">
                    <FormGroup>
                      <Label for="location">Location :</Label>
                      <Input
                        id="location"
                        placeholder="search..."
                        value={locationFilter}
                        onChange={(e) => {
                          handleLocationChange(e.target.value);
                        }}
                      />
                      <div className="location-groups mt-2">
                        {locations.map((button) => (
                          <div
                            key={button.value}
                            className={`location-button rounded-pill ${
                              locationFilter === button.value ? "selected" : ""
                            }`}
                            value={locationFilter}
                            onClick={() => {
                              handleLocationChange(button.value);
                            }}
                          >
                            {button.label}
                          </div>
                        ))}
                      </div>
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Label for="budget">Budget :</Label>
                      <div className="range-bar">
                        <input
                          type="range"
                          className="range-input"
                          min="5000"
                          max="25000"
                          value={budgetFilter}
                          step="1000"
                          onChange={handleBudgetChange}
                        />
                      </div>
                      <div className="range-labels">
                        <span>5k</span>
                        <span>10k</span>
                        <span>20k</span>
                        <span>25k</span>
                        <span>50k</span>
                      </div>
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Label>Gender :</Label>
                      <div className="location-groups">
                        {gender.map((button) => (
                          <div
                            key={button.value}
                            className={`location-button rounded-pill ${
                              genderFilter === button.value ? "selected" : ""
                            }`}
                            value={genderFilter}
                            onClick={() => {
                              handleGenderChange(button.value);
                            }}
                          >
                            {button.label}
                          </div>
                        ))}
                      </div>
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Label>Ocupancy Type :</Label>
                      <div className="location-groups">
                        {Ocupancy.map((button) => (
                          <div
                            key={button.value}
                            className={`location-button rounded-pill ${
                              occupancyFilter === button.value ? "selected" : ""
                            }`}
                            value={locationFilter}
                            onClick={() => {
                              handleOccupancyChange(button.value);
                            }}
                          >
                            {button.label}
                          </div>
                        ))}
                      </div>
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Label>Furnished Type :</Label>
                      <div className="location-groups">
                        {Furnished.map((button) => (
                          <div
                            key={button.value}
                            className={`location-button rounded-pill ${
                              furnishedFilter === button.value ? "selected" : ""
                            }`}
                            value={furnishedFilter}
                            onClick={() => {
                              handleFurnishedChange(button.value);
                            }}
                          >
                            {button.label}
                          </div>
                        ))}
                      </div>
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Label>Availability :</Label>
                      <div className="location-groups">
                        {Availability.map((button) => (
                          <div
                            key={button.value}
                            className={`location-button rounded-pill ${
                              availabilityFilter === button.value
                                ? "selected"
                                : ""
                            }`}
                            value={availabilityFilter}
                            onClick={() => {
                              handleAvailabilityChange(button.value);
                            }}
                          >
                            {button.label}
                          </div>
                        ))}
                      </div>
                    </FormGroup>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayingGuest;
