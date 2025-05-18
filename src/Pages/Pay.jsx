import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const PaymentGateway = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [carPrice, setCarPrice] = useState(50000); // Example car price

  const handleTabChange = (index) => {
    setActiveTab(index);
  };
  const handleOnClick=()=>{
    alert("Payment Successful")

  }

  return (
    <div className="payment-gateway bg-custom-gradient min-h-screen p-8  shadow-md max-w-3xl mx-auto ">
      <h2 className="text-2xl font-semibold mb-6 text-center">Select Payment Method</h2>
      <ul className="tabs-list flex justify-center space-x-4 mb-6">
        {['Credit Card', 'Net Banking', 'PayPal', 'Debit Card'].map((method, index) => (
          <li
            key={index}
            className={`tab-item cursor-pointer py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${activeTab === index ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            onClick={() => handleTabChange(index)}
          >
            {method}
          </li>
        ))}
      </ul>

      <div className="tabs-content bg-white p-6 rounded-lg shadow">
        {activeTab === 0 && <CreditCardForm carPrice={carPrice} />}
        {activeTab === 1 && <NetBanking carPrice={carPrice} />}
        {activeTab === 2 && <PayPalForm carPrice={carPrice} />}
        {activeTab === 3 && <DebitCardForm carPrice={carPrice} />}
      </div>

      <div className="go text-xl text-white mt-5">
        <button onClick={()=>{
          navigate("/")
          
        }}>Go to home</button>
      </div>
    </div>
  );
};

const CreditCardForm = ({ carPrice }) => (
  <div className="payment-info">
    <h3 className="text-xl font-semibold mb-4">Credit Card Info</h3>
    <form>
      <div className="form-group mb-4">
        <label className="block text-sm font-medium mb-2">Amount</label>
        <input
          type="text"
          // value={`₹ ${carPrice}`}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="form-group mb-4">
        <label className="block text-sm font-medium mb-2">Name on Card</label>
        <input type="text" placeholder="Enter the name" required className="w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="form-group mb-4">
        <label className="block text-sm font-medium mb-2">Card Number</label>
        <input type="text" placeholder="0000-0000-0000-0000" required className="w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="form-row flex space-x-4 mb-4">
        <div className="form-group flex-1">
          <label className="block text-sm font-medium mb-2">Expiration</label>
          <div className="flex space-x-2">
            <input type="number" placeholder="MM" min="1" max="12" required className="w-full p-2 border border-gray-300 rounded-md" />
            <input type="number" placeholder="YYYY" min="2023" required className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
        </div>
        <div className="form-group flex-1">
          <label className="block text-sm font-medium mb-2">CVV Number</label>
          <input type="password" placeholder="XXX" required className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
      </div>
      <button type="submit" className="confirm-btn w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition">Send</button>
    </form>
  </div>
);

const NetBanking = ({ carPrice }) => (
  <div className="payment-info">
    <h3 className="text-xl font-semibold mb-4">Net Banking</h3>
    <div className="bank-options space-y-2 mb-4">
      {[
        'Andhra Bank',
        'Allahabad Bank',
        'Bank of Baroda',
        'Canara Bank',
        'IDBI Bank',
        'ICICI Bank',
        'Indian Overseas Bank',
        'Punjab National Bank',
        'State Bank of India',
        'HDFC Bank',
      ].map((bank, index) => (
        <div key={index} className="radio-btn">
          <label className="flex items-center space-x-2">
            <input type="radio" name="bank" className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-400" />
            <span className="text-sm font-medium">{bank}</span>
          </label>
        </div>
      ))}
    </div>
    <div className="form-group mb-4">
      <label className="block text-sm font-medium mb-2">Amount</label>
      <input
        type="text"
        value={`₹ ${carPrice}`}
        readOnly
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
    <button className="confirm-btn w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition">Continue</button>
  </div>
);

const PayPalForm = ({ carPrice }) => (
  <div className="payment-info">
    <h3 className="text-xl font-semibold mb-4">PayPal</h3>
    <h4 className="text-lg font-medium mb-4">Already Have A PayPal Account?</h4>
    <form>
      <div className="form-group mb-4">
        <label className="block text-sm font-medium mb-2">Email</label>
        <input type="email" placeholder="name@email.com" required className="w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="form-group mb-4">
        <label className="block text-sm font-medium mb-2">Password</label>
        <input type="password" placeholder="Password" required className="w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="form-group mb-4">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-400" />
          <span className="text-sm">Remember me</span>
        </label>
      </div>
      <div className="form-group mb-4">
        <label className="block text-sm font-medium mb-2">Amount</label>
        <input
          type="text"
          // value={`₹ ${carPrice}`}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button type="submit" className="confirm-btn w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition">Login</button>
    </form>
  </div>
);

const DebitCardForm = ({ carPrice }) => (
  <div className="payment-info">
    <h3 className="text-xl font-semibold mb-4">Debit Card Info</h3>
    <form>
      <div className="form-group mb-4">
        <label className="block text-sm font-medium mb-2">Amount</label>
        <input
          type="text"
          // value={`₹ ${carPrice}`}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="form-group mb-4">
        <label className="block text-sm font-medium mb-2">Name on Card</label>
        <input type="text" placeholder="Enter the name" required className="w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="form-group mb-4">
        <label className="block text-sm font-medium mb-2">Card Number</label>
        <input type="text" placeholder="0000-0000-0000-0000" required className="w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="form-row flex space-x-4 mb-4">
        <div className="form-group flex-1">
          <label className="block text-sm font-medium mb-2">Expiration</label>
          <div className="flex space-x-2">
            <input type="number" placeholder="MM" min="1" max="12" required className="w-full p-2 border border-gray-300 rounded-md" />
            <input type="number" placeholder="YYYY" min="2023" required className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
        </div>
        <div className="form-group flex-1">
          <label className="block text-sm font-medium mb-2">CVV Number</label>
          <input
            type="password"
            placeholder="XXX"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <button
        type="submit"
        className="confirm-btn w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition"
      >
        Confirm Payment
      </button>
    </form>
  </div>
);

export default PaymentGateway;
