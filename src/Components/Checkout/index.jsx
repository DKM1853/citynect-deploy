import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { PLANS } from "../../constants/plan";
import usePlan from "../../contexts/planContext";
import "./checkout.css";
import ProceedToPayment from "./payment/ProceedToPayment";

const getCheckoutCardText = (selectedPlanTitle = "Basic Plan") => {
  return `By continuing you can contact upto
  ${
    (selectedPlanTitle === "PRO Plan" && " 25 ") ||
    (selectedPlanTitle === "Basic Plan" && " 12 ") ||
    (selectedPlanTitle === "King" && " 20 ")
  }
  property owners and find your ideal home brokerage and hassle free`;
};

const CheckoutPage = ({ user }) => {
  const [showSelect, setShowSelect] = useState(false);
  const { setPlan, plan } = usePlan();

  const toggleSelect = () => {
    setShowSelect(!showSelect);
  };
  const changePlan = (planPrice) => {
    const plan = Object.values(PLANS).find(
      ({ price }) => price.toString() === planPrice
    );
    setPlan(plan);
    toggleSelect();
  };

  return (
    <div className="checkoutBody">
      <main>
        <div className="checkoutCard">
          <div className="checkoutCard-body">
            <div className="checkoutCard-title">Thanks For Choosing Us</div>
            <div className="checkoutCard-subtitle">Order Summary</div>
            <div className="checkoutCard-text">
              {getCheckoutCardText(plan.title)}
            </div>
            <div className="checkoutCard-plan">
              <div className="checkoutCard-plan-img">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="checkoutCard-plan-text">
                <div className="checkoutCard-plan-title">{plan.title}</div>
                <div className="checkoutCard-plan-price">Rs {plan.price}</div>
              </div>
              <div className="checkoutCard-plan-link" onClick={toggleSelect}>
                Change
              </div>
            </div>
            {showSelect && (
              <div className="mt-4">
                <select
                  className="custom-select"
                  onChange={(e) => changePlan(e.target.value)}
                  value={plan.price}
                >
                  <option>Select the plan</option>
                  {Object.values(PLANS).map((plan, index) => (
                    <option key={`${plan.title}-${index}`} value={plan.price}>
                      {plan.title} - Rs {plan.price}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {user ? (
              <ProceedToPayment user={user} />
            ) : (
              <p>Your are not authorize for payment</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default React.memo(CheckoutPage);
