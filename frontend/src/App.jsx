import React from "react";
import axios from "axios";
import { loadRazorpayScript } from "./utils/loadRazorpay";

const makePayment = async () => {
  const res = await loadRazorpayScript();
  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const { data } = await axios.post(" http://localhost:4000/api/payment/create-order", {
    amount: 500, // ₹500
  });

  const options = {
    key: "rzp_test_HmXbvBRY4q7lSg", // from Razorpay dashboard
    amount: data.order.amount,
    currency: "INR",
    name: "vikram.dev",
    description: "Test Payment",
    order_id: data.order.id,
    handler: function (response) {
      alert("Payment successful!");
      console.log("Payment ID:", response.razorpay_payment_id);
    },
    prefill: {
      name: "Vikram",
      email: "v4vikram.dev@gmail.com",
      contact: "9999999999",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

const App = () => {
  return (
    <button
      onClick={makePayment}
      className="bg-blue-500 text-white p-2 rounded"
    >
      Pay Now
    </button>
  );
};

export default App;
