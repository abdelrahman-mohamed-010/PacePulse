import React, { useState } from "react";

const NewSettler: React.FC = () => {
  const [email, setEmail] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(`Submitting email: ${email}`);
    setShowSuccessMessage(true);
    setEmail("");

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };

  return (
    <div className=" bg-rose-800 text-white py-12 mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">New Settler Collection</h2>
          <p className="text-lg mt-4">Discover our latest arrivals</p>
        </div>
        {/* Email Subscription Form */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Subscribe to Our Latest Arrivals
          </h3>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center max-w-lg mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Your email address"
              className="py-3 px-4 w-full sm:w-auto border border-gray-300 rounded-l-md focus:outline-none focus:border-rose-500 text-black placeholder-gray-500" // Ensure text color is black and placeholder is light gray
              required
            />
            <button
              type="submit"
              className="bg-rose-500 text-white py-3 px-6 rounded-r-md ml-2 hover:bg-rose-600 focus:outline-none focus:bg-rose-600"
            >
              Subscribe
            </button>
          </form>
          {showSuccessMessage && (
            <p className="mt-3 font-bold text-white">
              Email sent successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewSettler;
