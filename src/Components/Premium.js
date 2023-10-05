import {} from "@fortawesome/free-regular-svg-icons";
import {
  faCircleQuestion,
  faCrown,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { ButtonToolbar, OverlayTrigger, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PLANS } from "../constants/plan";
import usePlan from "../contexts/planContext";
import "./Premium.css";
const Premium = () => {
  const { setPlan } = usePlan();
  const router = useNavigate();
  const [activePlan, setActivePlan] = useState("king-plan");
  const scrollToPlan = (planId) => {
    setActivePlan(planId);
    const container = planContainerRef.current;

    if (container) {
      const oneThirdWidth = container.scrollWidth / 3;
      if (planId === "basic-plan") {
        container.scrollLeft = 0;
      } else if (planId === "king-plan") {
        container.scrollLeft = oneThirdWidth;
      } else {
        container.scrollLeft = 2 * oneThirdWidth;
      }
    }
  };
  const planContainerRef = React.createRef();
  useEffect(() => {
    planContainerRef.current.scrollLeft = 300;
    //eslint-disable-next-line
  }, []);
  const popoverHoverFocus = (message) => (
    <Popover
      id="popover-trigger-hover-focus"
      title="Popover bottom"
      className="p-1"
    >
      {message}
    </Popover>
  );

  const planChangeHandler = (plan) => {
    setPlan(plan);
    router("/checkout");
  };
  return (
    <div className="MainContainer">
      <div className="heading">
        <h5 className="text-center">Choose Your Plan</h5>
      </div>
      <div className="mainPremiumBox" ref={planContainerRef}>
        <div
          className={`plan PremiumCard ${
            activePlan === "basic-plan" ? "active" : ""
          }`}
          id="basic-plan"
        >
          <div className="freePlanBox">
            <div className="cardHeading">Basic Plan</div>
            <div className="cardDescription text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
              cupiditate.
            </div>
            <div className="priceBox">
              <span style={{ fontSize: "25px" }}>₹</span>
              <span>349</span>
            </div>
            <div className="speapretor"></div>
            <div className="cardFeatures">
              <div className="featureTitle">Benefits:</div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#00b090",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">
                    Contact upto: 12 properties
                  </div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#00b090",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">Sharing Flat</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#00b090",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">P.G.</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#00b090",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">Private Flat</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#00b090",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">Priority Support</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#00b090",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">Validity :30 Days</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#ffcd35",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="m11.807 16.415-1.395 1.392a.654.654 0 0 1-.927 0L6 14.324l-3.483 3.483a.657.657 0 0 1-.93 0L.193 16.415a.657.657 0 0 1 0-.93L3.675 12 .193 8.517a.662.662 0 0 1 0-.93l1.394-1.394a.657.657 0 0 1 .93 0L6 9.678l3.485-3.485a.654.654 0 0 1 .927 0l1.395 1.392a.662.662 0 0 1 .002.932L8.324 12l3.483 3.485a.657.657 0 0 1 0 .93Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">Not refundable</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
            </div>
            <button
              className="continueButton"
              onClick={() => planChangeHandler(PLANS.BASIC)}
            >
              Continue
            </button>
          </div>
        </div>
        <div
          className={`plan PremiumCard ${
            activePlan === "king-plan" ? "active" : ""
          }`}
          id="king-plan"
        >
          <div className="badgeBox">
            <div className="popularBadge">Most Popular</div>
            <div className="downArrow">
              <FontAwesomeIcon icon={faSortDown} />
            </div>
          </div>
          <div className="basicPlanBox" id="kingPlanBoxId">
            <FontAwesomeIcon
              className="crownSection"
              style={{ pointerEvents: "none", color: "#ffc107" }}
              icon={faCrown}
            />
            <div className="cardHeading">King</div>
            <div className="cardDescription text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
              cupiditate.
            </div>
            <div className="priceBox">
              <span style={{ fontSize: "25px" }}>₹</span>
              <span>549</span>
            </div>
            <div className="speapretor"></div>
            <div className="cardFeatures">
              <div className="featureTitle" style={{ color: "#ffc107" }}>
                Benefits:
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#fff",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">
                    Contact upto: 20 properties
                  </div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#fff",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">Sharing Flat</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#fff",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">P.G.</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#fff",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">Private Flat</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#fff",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">Priority Support</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#fff",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">Personal assistant</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#fff",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">Validity :60 Days</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#fff",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">
                    Refundable{" "}
                    <span style={{ fontSize: "12px" }}>(t&c appilied)</span>
                  </div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
            </div>
            <button
              className="continueButton"
              style={{ backgroundColor: "#ffc107" }}
              onClick={() => planChangeHandler(PLANS.KING)}
            >
              Continue
            </button>
          </div>
        </div>
        <div
          className={`plan PremiumCard ${
            activePlan === "pro-plan" ? "active" : ""
          }`}
          id="pro-plan"
        >
          <div className="proPlanBox" id="proPlanBoxId">
            <div className="cardHeading">Pro Plan</div>
            <div className="cardDescription text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
              cupiditate.
            </div>
            <div className="priceBox">
              <span style={{ fontSize: "25px" }}>₹</span>
              <span>999</span>
            </div>
            <div className="speapretor"></div>
            <div className="cardFeatures">
              <div className="featureTitle">Benefits:</div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#00b090",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">
                    Contact upto: 25 properties
                  </div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#00b090",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">Sharing Flat</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#00b090",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">P.G.</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#00b090",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">Private Flat</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#00b090",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">Priority Support</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#00b090",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">Personal assistant</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#00b090",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">Validity :60 Days</div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
              <div className="featureContent">
                <div className="d-flex">
                  <svg
                    data-v-165629f9
                    data-v-9c16c3cc
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 24"
                    aria-label="check"
                    role="presentation"
                    className="h-icon-success"
                    style={{
                      width: "12px",
                      height: "24px",
                      fill: "#00b090",
                      marginRight: "8px",
                    }}
                  >
                    <g data-v-165629f9>
                      <path
                        data-v-165629f9
                        d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                      ></path>
                    </g>
                  </svg>
                  <div className="featureContent-text">
                    Refundable{" "}
                    <span style={{ fontSize: "12px" }}>(t&c appilied)</span>
                  </div>
                </div>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="left"
                    overlay={popoverHoverFocus("message")}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                  </OverlayTrigger>
                </ButtonToolbar>
              </div>
            </div>
            <button
              className="continueButton"
              onClick={() => planChangeHandler(PLANS.PRO)}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <div className="indicatorContainer LaptopHide">
        <div
          className={`indicator ${
            activePlan === "basic-plan" ? "activeIndicator" : ""
          }`}
          onClick={() => scrollToPlan("basic-plan")}
        ></div>
        <div
          className={`indicator ${
            activePlan === "king-plan" ? "activeIndicator" : ""
          }`}
          onClick={() => scrollToPlan("king-plan")}
        ></div>
        <div
          className={`indicator ${
            activePlan === "pro-plan" ? "activeIndicator" : ""
          }`}
          onClick={() => scrollToPlan("pro-plan")}
        ></div>
      </div>
    </div>
  );
};
export default Premium;
