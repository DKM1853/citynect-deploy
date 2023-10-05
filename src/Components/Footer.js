import React from "react";
import "./style.css";
import "./demo.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start text-white"
      style={{ backgroundColor: "#1c2331" }}
    >
      <section
        className="d-flex flex-wrap p-4"
		id="footerSocial"
        style={{ backgroundColor: "#287DFD" }}
      >
        <div className="">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <Link
            target="_blank"
            rel="noreferrer"
            to="https://www.facebook.com/flatandflatmatesinahmedabad.citynect.in"
            className="text-decoration-none text-white me-4"
          >
            {" "}
            <FontAwesomeIcon icon={faFacebook} />
          </Link>{" "}
          <Link
            target="_blank"
            rel="noreferrer"
            to="https://www.instagram.com/citynectahmedabad/"
            className="text-decoration-none text-white me-4"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </Link>{" "}
          <Link
            target="_blank"
            rel="noreferrer"
            to="https://www.linkedin.com/company/citynect-flatandflatmates/?viewAsMember=true"
            className="text-decoration-none text-white me-4"
          >
            {" "}
            <FontAwesomeIcon icon={faLinkedin} />
          </Link>{" "}
          <Link
            target="_blank"
            rel="noreferrer"
            to="https://twitter.com/citynect_in"
            className="text-decoration-none text-white me-4"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </Link>{" "}
          <Link
            target="_blank"
            rel="noreferrer"
            to="https://www.youtube.com/channel/UCQ_8tKYGdPifCDhLJP89GjQ"
            className="text-decoration-none text-white me-4"
          >
            {" "}
            <FontAwesomeIcon icon={faYoutube} />
          </Link>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Citynect</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#287DFD",
                  height: "2px",
                }}
              />
              <p>
                Simplifying your housing search, connecting you directly with
                verified property owners. Enjoy transparency, peace of mind, & a
                hassle-free experience!
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 col-6">
              <h6 className="text-uppercase fw-bold">Services</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#287DFD",
                  height: "2px",
                }}
              />
              <p>
                <Link to="" className="text-decoration-none text-white">
                  Home
                </Link>
              </p>
              <p>
                <Link
                  to="paying-guest-in-ahmedabad"
                  className="text-decoration-none text-white"
                >
                  Paying Guest
                </Link>
              </p>
              <p>
                <Link
                  to="sharingflats"
                  className="text-decoration-none text-white"
                >
                  Sharing Flats
                </Link>
              </p>
              <p>
                <Link
                  to="privateflats"
                  className="text-decoration-none text-white"
                >
                  Private Flats
                </Link>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 col-6">
              <h6 className="text-uppercase fw-bold">Useful links</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#287DFD",
                  height: "2px",
                }}
              />
              <p>
                <Link
                  to="terms-and-conditions"
                  className="text-decoration-none text-white"
                >
                  Terms & condition
                </Link>
              </p>
              <p>
                <Link
                  to="refund-policy"
                  className="text-decoration-none text-white"
                >
                  Refund Policy
                </Link>
              </p>
              <p>
                <Link
                  to="about-us"
                  className="text-decoration-none text-white"
                >
                  About Us
                </Link>
              </p>
              <p>
                <Link
                  to="privacy-Policy"
                  className="text-decoration-none text-white"
                >
                  Privacy Policy
                </Link>
              </p>
              <p>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  to="https://api.whatsapp.com/send?phone=+919316066832&text=Hello%20there,%20I%20have%20a%20question%20for%20you."
                  className="text-decoration-none text-white"
                >
                  Help
                </Link>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold">Contact</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#287DFD",
                  height: "2px",
                }}
              />
              <p>
                <svg
                  width="20"
                  height="23"
                  viewBox="0 0 20 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99797 13.2425C7.72707 13.2425 5.87201 11.4691 5.87201 9.27529C5.87201 7.08157 7.72707 5.31836 9.99797 5.31836C12.2688 5.31836 14.1239 7.09182 14.1239 9.28555C14.1239 11.4793 12.2688 13.2425 9.99797 13.2425ZM9.99797 6.85604C8.612 6.85604 7.4712 7.94268 7.4712 9.28555C7.4712 10.6285 8.60134 11.7151 9.99797 11.7151C11.3946 11.7151 12.5247 10.6285 12.5247 9.28555C12.5247 7.94268 11.3839 6.85604 9.99797 6.85604Z"
                    fill="white"
                  />
                  <path
                    d="M9.99671 22.0504C8.41884 22.0504 6.8303 21.4763 5.59359 20.3384C2.44851 17.4271 -1.02706 12.7833 0.284274 7.25787C1.46768 2.24502 6.02004 0 9.99671 0H10.0074C13.984 0 18.5364 2.24502 19.7198 7.26812C21.0205 12.7935 17.5449 17.4271 14.3998 20.3384C13.1631 21.4763 11.5746 22.0504 9.99671 22.0504ZM9.99671 1.53768C6.89427 1.53768 2.90695 3.12663 1.85148 7.59616C0.700064 12.4245 3.8558 16.5865 6.71303 19.2211C8.55744 20.933 11.4466 20.933 13.291 19.2211C16.1376 16.5865 19.2934 12.4245 18.1633 7.59616C17.0971 3.12663 13.0991 1.53768 9.99671 1.53768Z"
                    fill="white"
                  />
                </svg>{" "}
                Block -A, ihub gujarat, KCG campus, university road naranpura
                Ahmd-380009
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} /> mail.citynect.in@gmail.com
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} /> +91-9316066832
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023{" "}
        <Link
          className="text-decoration-none text-white"
          to="https://citynect.in/"
        >
          citynect.in{" "}
        </Link>
        | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
