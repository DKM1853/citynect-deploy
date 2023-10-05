import { Checkout, CheckoutProvider } from "paytm-blink-checkout-react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PAYMENT_STATUS } from "../../../constants/payment";
import usePayment from "../../../contexts/paymentContext";
import usePlan from "../../../contexts/planContext";
import { Loading } from "../../shared/Loading";
import { merchantConfig } from "./mocks/merchant-config";

const USE_EXISTING_CHECKOUT_INSTANCE = "Use existing checkout instance : ";

function ProceedToPayment({ user }) {
  const router = useNavigate();
  // inital variable start
  const userId = localStorage.getItem("user");
  // inital variable end

  // context variable and methods start
  const { setOrderId, setPaymentStatus, getOrderId } = usePayment();
  const { plan } = usePlan();
  // context variable and methods end

  const getCheckoutJsObj = useCallback(() => {
    if (window && window.Paytm && window.Paytm.CheckoutJS) {
      return window.Paytm.CheckoutJS;
    } else {
      console.error(
        USE_EXISTING_CHECKOUT_INSTANCE + "Checkout instance not found!"
      );
    }
    return null;
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutJsInstance, setCheckoutJsInstance] = useState(null);

  // inital function which update append function handler append to the config
  const appendMercantConfigHandler = (config) => {
    const newConfig = { ...config };
    newConfig.handler = {
      // TODO: Need to remove this console once it get to production for security and update with api call in new thread
      notifyMerchant: function notifyMerchant(eventName, data) {
        // setNotifyMerchantData({ eventName, data });
        if (eventName === "APP_CLOSED") {
          toast.error(`Payment Failed due to application closed`);
          handleCancelOrder(data?.message);
          setPaymentStatus(PAYMENT_STATUS.FAILURE);
          document.body.style = "";
          router(`/payment-status?status=${PAYMENT_STATUS.FAILURE}`, {
            replace: true,
          });
        }
        // TODO: uncomment if need to debug
        console.log("notify merchant about the payment state", {
          eventName,
          data,
        });
      },
      transactionStatus: async function transactionStatus(
        paymentStatusResponse
      ) {
        const respose = await fetch(
          `${process.env.REACT_APP_API_IP}/api/v1/paymentGateway/paymentstatus-update`,
          {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentStatusResponse),
          }
        );
        const responseData = await respose.json();
        const { status } = responseData;
        if (window && window.Paytm && window.Paytm.CheckoutJS) {
          setIsOpen(false);
          document.body.style = "";
          window.Paytm.CheckoutJS.close();
          if (status === "Success") {
            toast.success(`Payment Successfull`);
            setPaymentStatus(PAYMENT_STATUS.SUCCESS);
          } else {
            toast.error(`Payment ${status}`);
            setPaymentStatus(PAYMENT_STATUS.FAILURE);
          }
          router(
            `/payment-status?status=${
              String(status).toLocaleLowerCase() || ""
            }`,
            {
              replace: true,
            }
          );
        }
      },
    };
    return newConfig;
  };

  // state which require to update before set inital value start
  const [mConfig, setMConfig] = useState(
    appendMercantConfigHandler(merchantConfig)
  );
  // state which require to update before set inital value end`

  const getInitalTransactionData = async () => {
    // toast.success("getInitalTransactionData calling");
    const respose = await fetch(
      `${process.env.REACT_APP_API_IP}/api/v1/paymentGateway/start`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: plan?.price || 0,
          customerId: userId,
        }),
      }
    );
    const resposeData = await respose.json();
    const {
      amount,
      body: { txnToken },
      orderId,
    } = resposeData;

    setOrderId(orderId);
    // default value set if already present value found
    // setTransactionStatus(null);
    setIsOpen(false);
    // setNotifyMerchantData(null);

    const checkoutJsInstance = getCheckoutJsObj();

    if (checkoutJsInstance) {
      setMConfig((previousConfig) => {
        const newConfig = { ...previousConfig };
        newConfig.data.orderId = orderId;
        newConfig.data.token = txnToken;
        newConfig.data.amount = amount;
        return newConfig;
      });

      // adding setTimeout because required some 2ms to load paytm script so we dose not get error in console
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }

    if (checkoutJsInstance && checkoutJsInstance.onLoad) {
      checkoutJsInstance.onLoad(() => {
        setCheckoutJsInstance(checkoutJsInstance);
      });
    }
  };

  const handleCancelOrder = async (message) => {
    const respose = await fetch(
      `${
        process.env.REACT_APP_API_IP
      }/api/v1/paymentGateway/cancel-payment/${getOrderId()}`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentStatus: message,
        }),
      }
    );
    const responseData = await respose.json();
    console.log(responseData);
  };

  const cancelOrderHandler = () => {
    handleCancelOrder("click cancel order button");
    router("/payment-status", { replace: true });
  };

  useEffect(() => {
    setIsLoading(true);
    getInitalTransactionData();
  }, [plan]);

  const proceedToPaymentHandler = () => {
    document.body.style.height = "100vh";
    document.body.style.maxHeight = "100vh";
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  };

  const RenderButton = () => {
    return (
      <>
        <div className="checkoutCard-payment-button">
          <button onClick={proceedToPaymentHandler}>Proceed to Payment</button>
        </div>
        <div className="checkoutCard-cancel-button">
          <button onClick={cancelOrderHandler}>Cancel Order</button>
        </div>
      </>
    );
  };

  return (
    <>
      <CheckoutProvider
        config={mConfig}
        checkoutJsInstance={checkoutJsInstance}
        env="STAGE"
      >
        {isLoading && (
          <div
            style={{
              paddingBlock: "2rem",
              height: "min-content",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loading />
          </div>
        )}
        {!isLoading && (
          <>
            <RenderButton />
            {isOpen && <Checkout />}
          </>
        )}
      </CheckoutProvider>
    </>
  );
}

export default ProceedToPayment;
