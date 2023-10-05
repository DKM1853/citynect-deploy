import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { PAYMENT_STATUS } from "../../../constants/payment";
import usePayment from "../../../contexts/paymentContext";
import usePlan from "../../../contexts/planContext";
import "../checkout.css";
import { useNavigate } from "react-router-dom";

const CheckoutPage = ({ user }) => {
  const { paymentStatus, getOrderId } = usePayment();
  const { plan } = usePlan();
  const router = useNavigate();

  useEffect(() => {
    const redirect = setTimeout(() => {
      router("/myaccount/premiumdetails");
    }, 4000);

    return clearTimeout(redirect);
  }, []);

  return (
    <div className="checkoutBody">
      <main>
        <div className="checkoutCard">
          <div className="checkoutCard-body">
            <div className="checkoutCard-title">Thanks For Choosing Us</div>
            <div className="checkoutCard-subtitle">Order Summary</div>
            <div className="checkout-card-status-wrapper">
              <FontAwesomeIcon
                icon={
                  paymentStatus === PAYMENT_STATUS.SUCCESS
                    ? faCircleCheck
                    : faCircleXmark
                }
                size="6x"
                color={
                  paymentStatus === PAYMENT_STATUS.SUCCESS ? "green" : "red"
                }
              />
            </div>
            <div className="checkoutCard-text">
              Payment {paymentStatus}, for order <strong>{getOrderId()}</strong>
            </div>
            <div className="checkoutCard-plan">
              <div className="checkoutCard-plan-img">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="checkoutCard-plan-text">
                <div className="checkoutCard-plan-title">{plan.title}</div>
                <div className="checkoutCard-plan-price">Rs {plan.price}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
