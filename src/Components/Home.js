import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Input,
  Form,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAnglesRight,
  faArrowRight,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FormText, Image } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
const Home = () => {
  const placeholderText = "Search for location...";
  const [typing, setTyping] = useState(true);
  const [placeholder, setPlaceholder] = useState("");
  const [properties, setProperties] = useState([]);
  const [callbackDetails,setCallbackDetails] =useState({
    name:"",
    phone:"",
    email:"",
  })
  const handleInputChange = (e)=>{
    setCallbackDetails({
      ...callbackDetails,
      [e.target.name] : e.target.value
    })
  }
  
  const [errors, setErrors] = useState({
    name:"",
    error:""
  });
  const validateForm = () => {
    const newErrors = {};
    if (!callbackDetails.email) {
      newErrors.name = 'email'
      newErrors.error = 'Enter a Valid Email';
    }
    if (!callbackDetails.phone) {
      newErrors.name = 'phone'
      newErrors.error = 'Phone number is required.';
    } else if (callbackDetails.phone.length !== 10) {
      newErrors.name = 'phone'
      newErrors.error = 'Phone number must be 10 digits.';
    }
    if (!callbackDetails.name || callbackDetails.name.length<3) {
      newErrors.name = 'name'
      newErrors.error = 'Enter a Valid Name';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };
  const requestCallback =async()=>{
    const isValid = validateForm();
    if (isValid) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_IP}/user/request-callback`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(callbackDetails),
          }
        );
        if (response.ok) {
          toast.success("Callback Requested Successfully", {
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
          toast.error("Error in requesting callback", {
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
      } catch (error) {
        toast.error("Error in requesting callback", {
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
      setCallbackDetails(({
        name:"",
        phone:"",
        email:"",
      }))
    }
  }
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_IP}/property/Verified-properties`
      );
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (typing) {
        if (placeholder.length < placeholderText.length) {
          setPlaceholder(placeholderText.slice(0, placeholder.length + 1));
        } else {
          setTyping(false);
        }
      } else {
        if (placeholder.length > 0) {
          setPlaceholder(placeholder.slice(0, placeholder.length - 1));
        } else {
          setTyping(true);
        }
      }
    }, 100); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, [typing, placeholder]);

  const items = [
    {
      src: "./emenities/Property 1=Slider - 1.png",
      altText: "Slide 1",
      caption: "",
      key: 1,
    },
    {
      src: "./emenities/Property 1=Slider - 2.png",
      altText: "Slide 2",
      caption: "",
      key: 2,
    },
    {
      src: "./emenities/Property 1=Slider - 3.png",
      altText: "Slide 3",
      caption: "",
      key: 3,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} className="carouselImage" />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });
  const [search, setSearch] = useState();

  return (
    <div id="bg-color">
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
      <div className="px-3" id="info">
        <div className="row gx-5 align-items-center justify-content-center">
          <div className="col-lg-6 col-xl-6 col-xxl-6 col-12 col-md-6">
            <div className="mb-5">
              <h2
                className="text-md-start text-justify1 title-design"
                id="title"
              >
                Find your accommodation
                <br />
                <span className="text-danger"> Brokerage Free !</span>
              </h2>
              <div
                className="d-md-none col-lg-8 col-xl-8 col-xxl-8 col-12 col-md-6 mt-5"
                id="carousel"
              >
                <Carousel
                  activeIndex={activeIndex}
                  next={next}
                  previous={previous}
                >
                  <CarouselIndicators
                    items={items}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                  />
                  {slides}
                  <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={previous}
                  />
                  <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={next}
                  />
                </Carousel>
              </div>
              <div className="d-flex justify-items-start">
                <p className="fw-normal mt-2  col-md-10" id="intro">
                  Simplifying Bachelors housing search, connecting you directly
                  with verified property owners. Enjoy transparency & a hassle
                  free experience !
                </p>
              </div>
              <div className="d-flex justify-items-start">
                <div className="custom-search-bar  rounded-pill">
                  <div className="search-icon">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <input
                    type="text"
                    id="searchInput"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    placeholder={placeholder}
                  />
                  <Link
                    to={`/allproperties?location=${search}&budget=&gender=&furnished=&availability=&occupancy=`}
                  >
                    <button className="search-button rounded-pill d-flex">
                      Search{" "}
                      <FontAwesomeIcon
                        id="FontAwesomeIcon"
                        className="ms-2"
                        icon={faAnglesRight}
                      />{" "}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Curosal */}
          <div
            className="d-none d-md-block col-lg-4 col-xl-4 col-xxl-4 col-12 col-md-6"
            id="carousel"
          >
            <Carousel activeIndex={activeIndex} next={next} previous={previous}>
              <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
              />
              {slides}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
              />
            </Carousel>
          </div>
        </div>
      </div>
      <div className="bg-primary text-white mt-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-md-4 my-3">
              <span
                id="count1"
                style={{ fontSize: "45px" }}
                className="display-4"
              >
                <CountUp end={10000} />+
              </span>
              <h5 className="small-txt">
                Members joined & trusted our platform
              </h5>
            </div>
            <div className="col-md-4 my-3">
              <span
                id="count2"
                style={{ fontSize: "45px" }}
                className="display-4"
              >
                <CountUp end={5000} />+
              </span>
              <h5 className="small-txt">
                Leads exchanged including flat owners
              </h5>
            </div>
            <div className="col-md-4 my-3">
              <span
                id="count3"
                style={{ fontSize: "45px" }}
                className="display-4"
              >
                <CountUp end={300} />+
              </span>
              <h5 className="small-txt">Happy Customers</h5>
            </div>
          </div>
        </div>
      </div>
      {/* Features Properties */}
      <div className="container" id="Features">
        <div id="featuresHeader">
          <div id="featuresHeading">Features Properties !</div>
          <div className="laptopviewText" id="featuresSubHeading">
            <Link className="text-decoration-none" to={"/allproperties"}>
              <b>
                {" "}
                See all properties <FontAwesomeIcon icon={faArrowRight} />
              </b>
            </Link>
          </div>
          <div className="mobileviewText" id="featuresSubHeading">
            {" "}
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </div>
        <div className="featuresRow">
            {properties.map((property, index)  => index < 5 &&(
            <div className="card propertyCard " key={index}>
              <Link to={`/particular-property/${property.id}`} className="text-decoration-none text-dark">
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
                    {property.title.length > 25
                      ? `${property.title.substring(0, 25)}...`
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
          ))}
        </div>
      </div>
      <div className="RequestSection">
        <div className="container RequestBox">
          <div className="textBox">
            <h1>Are you struggling to find accommodation ???</h1>
            <h5 className="mobileviewText">
              Get free assistance from team citynect. Share your requirement
              with & we will help you !
            </h5>
            <h5 className="laptopviewText">
              Get free assistance from team citynect. Share your requirement
              with us and our dedicated team will help you in your search !
            </h5>
          </div>
          <div className="formBox">
            <Form>
              <FormGroup>
                <Label for="name">Name :</Label>
                <Input
                  type="text"
                  id="name"
                  required
                  name="name"
                  className="requestForm"
                  placeholder="Enter Your Name"
                  value={callbackDetails.name}
                  onChange={handleInputChange}
                />
                <FormText> {errors.name==="name" && <div className="error-message text-danger">{errors.error}</div>}</FormText>
              </FormGroup>
              <FormGroup>
                <Label for="phone">Phone :</Label>
                <Input
                  type="text"
                  id="phone"
                  className="requestForm"
                  required
                  name="phone"
                  placeholder="Enter Your Phone"
                  maxLength={10}
                  value={callbackDetails.phone}
                  onChange={handleInputChange}
                />
                <FormText> {errors.name==="phone" && <div className="error-message text-danger">{errors.error}</div>}</FormText>
              </FormGroup>
              <FormGroup>
                <Label for="email">Email :</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  className="requestForm"
                  required
                  placeholder="Enter Your Email"
                  value={callbackDetails.email}
                  onChange={handleInputChange}
                />
                <FormText> {errors.name==="email" && <div className="error-message text-danger">{errors.error}</div>}</FormText>
              </FormGroup>
              <Button className="requestBtn rounded-pill" onClick={requestCallback}>
                Request Callback !
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <div className="heading" id="special-heading">
        <h2>Top areas in Ahmedabad</h2>
      </div>
      <div className="card-group1">
        <div className="card1">
        <Link
            to={
              "/allproperties?location=prahladnagar&budget=&gender=&furnished=&availability=&occupancy="
            }
          >
            <img
              src="./emenities/Prahladnagar.jpeg"
              className="card-img-top"
              alt="Prahladnagar"
            />
            <div className="card-title-overlay">
              <h5 className="card-title">Prahladnagar</h5>
            </div>
          </Link>
        </div>
        <div className="card1">
          <Link
            to={
              "/allproperties?location=vastrapur&budget=&gender=&furnished=&availability=&occupancy="
            }
          >
            {" "}
            <img
              src="./emenities/Vastrapur.jpeg"
              className="card-img-top"
              alt="Vastrapur"
            />
            <div className="card-title-overlay">
              <h5 className="card-title">Vastrapur</h5>
            </div>
          </Link>
        </div>
        <div className="card1">
          <Link
            to={
              "/allproperties?location=satellite&budget=&gender=&furnished=&availability=&occupancy="
            }
          >
            {" "}
            <img
              src="./emenities/Satellite.jpeg"
              className="card-img-top"
              alt="Satellite"
            />
            <div className="card-title-overlay">
              <h5 className="card-title">Satellite</h5>
            </div>
          </Link>
        </div>
        <div className="card1">
          <Link
            to={
              "/allproperties?location=shivranjani&budget=&gender=&furnished=&availability=&occupancy="
            }
          >
            <img
              src="./emenities/Shivranjini.jpeg"
              className="card-img-top"
              alt="Shivranjani"
            />
            <div className="card-title-overlay">
              <h5 className="card-title">Shivranjani</h5>
            </div>
          </Link>
        </div>
        <div className="card1">
          <Link
            to={
              "/allproperties?location=thaltej&budget=&gender=&furnished=&availability=&occupancy="
            }
          >
            {" "}
            <img
              src="./emenities/Thaltej.jpeg"
              className="card-img-top"
              alt="Thaltej"
            />
            <div className="card-title-overlay">
              <h5 className="card-title">Thaltej</h5>
            </div>
          </Link>
        </div>
        <div className="card1">
          <Link
            to={
              "/allproperties?location=naranpura&budget=&gender=&furnished=&availability=&occupancy="
            }
          >
            {" "}
            <img
              src="./emenities/Naranpura.jpeg"
              className="card-img-top"
              alt="Naranpura"
            />
            <div className="card-title-overlay">
              <h5 className="card-title">Naranpura</h5>
            </div>
          </Link>
        </div>
        <div className="card1">
          <Link
            to={
              "/allproperties?location=makarba&budget=&gender=&furnished=&availability=&occupancy="
            }
          >
            {" "}
            <img
              src="./emenities/Makarba.jpeg"
              className="card-img-top"
              alt="Makarba"
            />
            <div className="card-title-overlay">
              <h5 className="card-title">Makarba</h5>
            </div>
          </Link>
        </div>
        <div className="card1">
          <Link
            to={
              "/allproperties?location=sg highway&budget=&gender=&furnished=&availability=&occupancy="
            }
          >
            <img
              src="./emenities/S.G Highway.jpeg"
              className="card-img-top"
              alt="S.G Highway"
            />
            <div className="card-title-overlay">
              <h5 className="card-title">S.G Highway</h5>
            </div>
          </Link>
        </div>
      </div>
      <div className="heading" id="special-heading">
        <h2>Why choose us ?</h2>
      </div>
      <div className="d-flex upper-spacing mt-5 flex-wrap ">
        <div className="col-12 col-sm-12 col-lg-3 col-xl-3 col-xxl-3">
          <div className="text-center mb-3">
            <img
              className="margin-top1"
              src="./emenities/No Brokerage Icon - Home Page Images.png"
              alt="No Brokerage  "
              width="100px"
              height="100px"
            />
          </div>
          <h4 className="text-center">No Brokerage</h4>
          <p className="text-center why-text">
            All the properties listed are brokerage free, no need to pay extra
            to anyone.
          </p>
        </div>
        <div className="col-12 col-sm-12 col-lg-3 col-xl-3 col-xxl-3">
          <div className="text-center mb-3">
            <img
              className="margin-top"
              src="./emenities/Verified Listings Icon - Home Page Images.png"
              alt="Verified Listings icon"
              width="100px"
              height="100px"
            />
          </div>
          <h4 className="text-center">Verified Listings</h4>
          <p className="text-center why-text">
            All the information about flats, PGs and Sharing flats are verified
            by our team.
          </p>
        </div>
        <div className="col-12 col-sm-12 col-lg-3 col-xl-3 col-xxl-3">
          <div className="text-center mb-3">
            <img
              className="margin-top"
              src="./emenities/Transaprent_pricing_Icon-_Home_page_images-removebg-preview.png"
              alt="Pricing Icon"
              width="100px"
              height="100px"
            />
          </div>
          <h4 className=" text-center">Transparent Pricing</h4>
          <p className="text-center why-text">
            A transparent fee for its services. No hidden commission or charges.
          </p>
        </div>
        <div className="col-12 col-sm-12 col-lg-3 col-xl-3 col-xxl-3">
          <div className="text-center mb-3">
            <img
              className="margin-top"
              src="emenities/247-7_Home_Page_Icon-removebg-preview.png"
              alt="24*7  "
              width="100px"
              height="100px"
            />
          </div>
          <h4 className=" text-center">24*7 Support</h4>
          <p className="text-center why-text">
            Our support team is 24hours available for any queries and
            complaints.
          </p>
        </div>
      </div>

      {/* Premium box */}
      <div className="" id="premiumBox">
        <div className="premiumText">
          <h1>
            Subscribe to our premium plan & find your right home brokerage free{" "}
          </h1>
          <h5>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil
            illum porro eum placeat quisquam doloremque aliquid officia
            exercitationem excepturi temporibus!
          </h5>
          <Link to={"/premium"}>
            <button className="rounded-pill">See Benefits!</button>
          </Link>
        </div>
        <div className="premiumPhoto">
          <Image
            src="./emenities/Property 1=Slider - 1.png"
            alt="Premimum Details"
          />
        </div>
      </div>
      <div className="" id="info1">
        <div className="row gx-5 d-flex flex-row-reverse align-items-center justify-content-center">
          <div className="col-lg-6 col-xl-6 col-xxl-6 col-12 col-md-6 d-flex justify-content-center ">
            <div className="my-5 mx-3">
              <h1 className="text-md-start text-justify title-design" id="">
                List your property for{" "}
                <span style={{ color: "#E74803" }}>FREE !</span>
              </h1>
              <div className="d-flex mx-2 flex-column justify-items-start">
                <p className="fw-normal col-md-10 my-0" id="">
                  <svg
                    width="19"
                    height="16"
                    viewBox="0 0 19 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.24468 0.572266C4.15086 0.572266 0 4.02465 0 8.26132C0 12.498 4.15086 15.9504 9.24468 15.9504C14.3385 15.9504 18.4894 12.498 18.4894 8.26132C18.4894 4.02465 14.3385 0.572266 9.24468 0.572266ZM13.6636 6.49284L8.4219 10.8525C8.29248 10.9602 8.11683 11.0217 7.93194 11.0217C7.74704 11.0217 7.57139 10.9602 7.44197 10.8525L4.82572 8.67653C4.55763 8.45355 4.55763 8.08447 4.82572 7.86149C5.09382 7.63851 5.53756 7.63851 5.80566 7.86149L7.93194 9.62997L12.6837 5.6778C12.9518 5.45481 13.3955 5.45481 13.6636 5.6778C13.9317 5.90078 13.9317 6.26217 13.6636 6.49284Z"
                      fill="#16D958"
                    />
                  </svg>{" "}
                  Find tenant/room-mate without paying any brokerage.
                </p>
                <p className="fw-normal col-md-10 my-0" id="">
                  <svg
                    width="19"
                    height="16"
                    viewBox="0 0 19 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.24468 0.572266C4.15086 0.572266 0 4.02465 0 8.26132C0 12.498 4.15086 15.9504 9.24468 15.9504C14.3385 15.9504 18.4894 12.498 18.4894 8.26132C18.4894 4.02465 14.3385 0.572266 9.24468 0.572266ZM13.6636 6.49284L8.4219 10.8525C8.29248 10.9602 8.11683 11.0217 7.93194 11.0217C7.74704 11.0217 7.57139 10.9602 7.44197 10.8525L4.82572 8.67653C4.55763 8.45355 4.55763 8.08447 4.82572 7.86149C5.09382 7.63851 5.53756 7.63851 5.80566 7.86149L7.93194 9.62997L12.6837 5.6778C12.9518 5.45481 13.3955 5.45481 13.6636 5.6778C13.9317 5.90078 13.9317 6.26217 13.6636 6.49284Z"
                      fill="#16D958"
                    />
                  </svg>{" "}
                  Get more visibility & direct touch with potential leads
                </p>
                <p className="fw-normal col-md-10 my-0" id="">
                  <svg
                    width="19"
                    height="16"
                    viewBox="0 0 19 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.24468 0.572266C4.15086 0.572266 0 4.02465 0 8.26132C0 12.498 4.15086 15.9504 9.24468 15.9504C14.3385 15.9504 18.4894 12.498 18.4894 8.26132C18.4894 4.02465 14.3385 0.572266 9.24468 0.572266ZM13.6636 6.49284L8.4219 10.8525C8.29248 10.9602 8.11683 11.0217 7.93194 11.0217C7.74704 11.0217 7.57139 10.9602 7.44197 10.8525L4.82572 8.67653C4.55763 8.45355 4.55763 8.08447 4.82572 7.86149C5.09382 7.63851 5.53756 7.63851 5.80566 7.86149L7.93194 9.62997L12.6837 5.6778C12.9518 5.45481 13.3955 5.45481 13.6636 5.6778C13.9317 5.90078 13.9317 6.26217 13.6636 6.49284Z"
                      fill="#16D958"
                    />
                  </svg>{" "}
                  Hassle free solution
                </p>
                <p className="fw-normal col-md-10 my-0" id="">
                  <svg
                    width="19"
                    height="16"
                    viewBox="0 0 19 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.24468 0.572266C4.15086 0.572266 0 4.02465 0 8.26132C0 12.498 4.15086 15.9504 9.24468 15.9504C14.3385 15.9504 18.4894 12.498 18.4894 8.26132C18.4894 4.02465 14.3385 0.572266 9.24468 0.572266ZM13.6636 6.49284L8.4219 10.8525C8.29248 10.9602 8.11683 11.0217 7.93194 11.0217C7.74704 11.0217 7.57139 10.9602 7.44197 10.8525L4.82572 8.67653C4.55763 8.45355 4.55763 8.08447 4.82572 7.86149C5.09382 7.63851 5.53756 7.63851 5.80566 7.86149L7.93194 9.62997L12.6837 5.6778C12.9518 5.45481 13.3955 5.45481 13.6636 5.6778C13.9317 5.90078 13.9317 6.26217 13.6636 6.49284Z"
                      fill="#16D958"
                    />
                  </svg>{" "}
                  One click listing & share with anyone
                </p>
                <div className="d-flex justify-items-start">
                  <Link
                    style={{ textDecoration: "none" }}
                    className="btn-own1 rounded-pill"
                    to={"/listProperty"}
                  >
                    Let's Start
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="d-none d-md-block col-lg-4 col-xl-4 col-xxl-4 col-12 col-md-6">
            <img
              src="./emenities/image 13.png"
              className="d-block w-100"
              alt="emenities"
            />
          </div>
        </div>
      </div>
      <div className="heading" id="special-heading">
        <h2>Join our WhatsApp Community</h2>
      </div>
      <div className="d-flex upper-spacing mt-5 mb-5 flex-wrap justify-content-center">
        <div className="">
          <div className="text-center mb-3">
            <img
              className="margin-top1 rounded-circle"
              src="./emenities/group-1.jpeg"
              alt="No Brokerage "
              width="100px"
              height="100px"
            />
          </div>
          <p className="text-center why-text">
            PG, Sharing Flat & Flatmates In Ahmedabad
          </p>
          <div className="text-center">
            <Link
              style={{ textDecoration: "none" }}
              className="mt-3  rounded-pill px-5 btn btn-primary"
              to="https://chat.whatsapp.com/DyxJaTyYSgQLrjlJWNfQEn"
              target="_blank"
              rel="noreferrer"
            >
              Join Now
            </Link>
          </div>
        </div>
        <div className="">
          <div className="text-center mb-3">
            <img
              className="margin-top rounded-circle"
              src="./emenities/group-2.jpeg"
              alt="Verified Listings icon"
              width="100px"
              height="100px"
            />
          </div>
          <p className="text-center why-text">
            Female Flatmates in Ahmedabad | Exclusively for Females
          </p>
          <div className="text-center">
            <Link
              style={{ textDecoration: "none" }}
              className="mt-3 rounded-pill px-5 btn btn-primary"
              to="https://chat.whatsapp.com/EXa07OubTYfEaTxN88AKmJ"
              target="_blank"
              rel="noreferrer"
            >
              Join Now
            </Link>
          </div>
        </div>
        <div className="">
          <div className="text-center mb-3">
            <img
              className="margin-top rounded-circle"
              src="./emenities/group-3.jpeg"
              alt="Pricing Icon"
              width="100px"
              height="100px"
            />
          </div>
          <p className="text-center why-text">
            West Ahmedabad | Find PG and Sharing Flat
          </p>
          <div className="text-center">
            <Link
              style={{ textDecoration: "none" }}
              className="mt-3 rounded-pill px-5 btn btn-primary"
              to="https://chat.whatsapp.com/BlNMuhUU8gp1riErg19bKq"
              target="_blank"
              rel="noreferrer"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
