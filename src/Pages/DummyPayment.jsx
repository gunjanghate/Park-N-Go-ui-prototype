import React, { useState } from 'react';

// Dummy Payment Component
const DummyPayment = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setPaymentStatus(null);

    // Simulating a payment process (success or failure after 2 seconds)
    setTimeout(() => {
      // Simulate success or failure randomly
      const isPaymentSuccessful = Math.random() > 0.5; // 50% chance of success

      setPaymentStatus(isPaymentSuccessful ? 'Payment Successful' : 'Payment Failed');
      setIsProcessing(false);
    }, 2000); // Simulate a 2-second payment processing time
  };

  return (
    <div>
      <h1>Dummy Payment Gateway</h1>
      <p>Simulating payment processing. No real transactions will occur.</p>

      <button onClick={handlePayment} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Make Payment'}
      </button>

      {paymentStatus && (
        <div style={{ marginTop: '20px', color: paymentStatus === 'Payment Successful' ? 'green' : 'red' }}>
          <h2>{paymentStatus}</h2>
        </div>
      )}
    </div>
  );
};

export default DummyPayment;
