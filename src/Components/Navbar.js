import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import LoginModal from "./Login.js";
import Signup from "./Signup";
import {
  faAngleRight,
  faAnglesDown,
  faBars,
  faCrown,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import "./demo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Button } from "reactstrap";
const Navbar = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0,0);
  },[navigate]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginmodal, setLoginmodal] = useState(false);
  const [signinmodal, setSigninmodal] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const [showSubMenu, setShowSubMenu] = useState(false);
  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };
const loginModal = () => {
    setSigninmodal(false)
    setLoginmodal(!loginmodal)
  };
  const signinModal = () => {
    setLoginmodal(false)
    setSigninmodal(!signinmodal)
  };

  useEffect(() => {
    const userId = localStorage.getItem("user");
    // console.log(user.name);
    if (userId) {
      setIsLoggedIn(true);
    }
  }, [loginmodal]);
  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.reload();
  };
  return (
    <nav className="navbar shadow-sm  sticky-top ">
      <Link
        target="_blank"
        rel="noreferrer"
        to="https://api.whatsapp.com/send?phone=+919316066832&text=Hello%20there,%20I%20have%20a%20question%20for%20you."
        className="whatsapp-button"
      >
        <FontAwesomeIcon icon={faWhatsapp} />
      </Link>
      <div className="Navcontainer">
        <div className="logo">
          <Link id="logoBox" className="navbar-brand" to="/">
            <img
              src="/emenities/logo.png"
              width={"500px"}
              alt="logo"
              className="mobileAndTab-hide"
            />
            <span className="navbar-text">citynect</span>
          </Link>
        </div>
        <div className="menu-icon rounded" onClick={handleShowNavbar}>
          {showNavbar ? (
            <FontAwesomeIcon icon={faX} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          {/* For Mobile View Only */}
          <ul>
            {isLoggedIn ? (
              <div>
                <li id="Myaccount" onClick={toggleSubMenu}>
                  My Account{" "}
                  {showSubMenu ? (
                    <FontAwesomeIcon className="ms-2" icon={faAnglesDown} />
                  ) : (
                    <FontAwesomeIcon className="ms-2" icon={faAngleRight} />
                  )}
                </li>
                {showSubMenu && (
                  <div id="MyaccountDiv">
                    {user && user.isPremium !== 0 && (
                      <li>
                        {" "}
                        <Link
                          to={`/myaccount/premiumdetails`}
                          onClick={handleShowNavbar}
                        >
                          Premium Details
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        onClick={handleShowNavbar}
                        to={`/myaccount/contactedproperty`}
                      >
                        Contacted Properties
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleShowNavbar}
                        to={`/myaccount/savedproperty`}
                      >
                        Saved Properties
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleShowNavbar}
                        to={`/myaccount/listedproperty`}
                      >
                        Listed Properties
                      </Link>
                    </li>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <li id="Myaccount">
                  <Button
                    id="registerBtn"
                    onClick={signinModal}
                    className="loginBtnMobileView py-1 mb-1 btn-primary rounded me-2"
                  >
                    Register
                  </Button>
                  <Button
                    id="loginBtn"
                    onClick={loginModal}
                    className="loginBtnMobileView py-1 mb-1 btn-primary rounded me-2"
                  >
                    Login
                  </Button>
                </li>
              </div>
            )}
            <li onClick={handleShowNavbar}>
              <NavLink to="/paying-guest-in-ahmedabad">Paying Guest</NavLink>
            </li>
            <li onClick={handleShowNavbar}>
              <NavLink to="/sharingflats">Sharing Flats</NavLink>
            </li>
            <li onClick={handleShowNavbar}>
              <NavLink to="/privateflats">Private Flats</NavLink>
            </li>
            <li className="listProperty" onClick={handleShowNavbar}>
              <Link to="/listProperty">
                List Property{" "}
                <span
                  className="badge rounded-pill text-bg-warning"
                  style={{ fontWeight: "lighter", paddingBottom: "2px" }}
                >
                  Free
                </span>
              </Link>
            </li>
            <div className="rounded text-white text-center" id="premium">
              <Link
                className="text-white"
                onClick={handleShowNavbar}
                to={"/premium"}
              >
                {" "}
                <span className=" rounded-circle p-1">
                  <FontAwesomeIcon
                    icon={faCrown}
                    style={{ color: "#ffc107" }}
                  />
                </span>{" "}
                Premium
              </Link>
            </div>
            {showSubMenu && (
              <li>
                <Link onClick={logout}>Logout</Link>
              </li>
            )}
          </ul>
        </div>
        {isLoggedIn ? (
          <div className="rightBox">
            <Link
              className="text-decoration-none text-white"
              onClick={handleShowNavbar}
              to={"/premium"}
            >
              <Button className="py-2 mb-1 btn-dark rounded-pill me-2">
                {" "}
                <span className=" rounded-circle p-1">
                  <FontAwesomeIcon
                    icon={faCrown}
                    style={{ color: "#ffc107" }}
                  />
                </span>{" "}
                Premium
              </Button>
            </Link>
            <div className="dropdown">
              <span className="dropbtn py-2 mb-1 rounded-pill">
                My Account<FontAwesomeIcon icon={faAnglesDown} />
              </span>
              <div className="dropdown-content">
              {user && (
                  <Link
                    to={``}
                    onClick={handleShowNavbar}
                  >
                    {user.name}
                  </Link>
                )}
                {user && user.isPremium !== 0 && (
                  <Link
                    to={`/myaccount/premiumdetails`}
                    onClick={handleShowNavbar}
                  >
                    Premium Details
                  </Link>
                )}
                <Link
                  to={`/myaccount/contactedproperty`}
                  onClick={handleShowNavbar}
                >
                  Contacted Properties
                </Link>
                <Link
                  to={`/myaccount/savedproperty`}
                  onClick={handleShowNavbar}
                >
                  Saved Properties
                </Link>
                <Link
                  to={`/myaccount/listedproperty`}
                  onClick={handleShowNavbar}
                >
                  Listed Properties
                </Link>
                <Link onClick={logout}>Logout</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="rightBox">
            <Button
              onClick={loginModal}
              id="loginBtn"
              className="py-2 mb-1 btn-primary rounded me-2"
            >
              Login
            </Button>
            <Button
              onClick={signinModal}
              id="registerBtn"
              className="py-2 mb-1 btn-primary rounded me-2"
            >
              Register
            </Button>
          </div>
        )}
      </div>

      {/* Signin Modal */}

      <Signup isOpen={signinmodal} onClose={signinModal} />
      {/* Login Modal */}
      <LoginModal isOpen={loginmodal} onClose={loginModal} />
    </nav>
  );
};

export default Navbar;
