import React, { useState } from "react";
import OrderSummary from "./OrderSummary";
import axios from "axios";

const Flower = () => {
  const flowers = [
    { id: 1, name: "Aishwarya White" },
    { id: 2, name: "Bhagyashree" },
    { id: 3, name: "Culcutta White" },
    { id: 4, name: "Lavender Pink" },
    { id: 5, name: "Madhuri" },
    { id: 6, name: "Meghna" },
    { id: 7, name: "Pournima" },
    { id: 8, name: "Pramila" },
    { id: 9, name: "Purple" },
    { id: 10, name: "Scent White" },
    { id: 11, name: "Scent Yellow" },
    { id: 12, name: "Suvarna" },
    { id: 13, name: "Suvidha" },
    { id: 14, name: "Shanka" },
  ];

  const [selectedFlower, setSelectedFlower] = useState();
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [_, setDeliveryDate] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // New state for keyboard navigation
  const [dropdownType, setDropdownType] = useState(""); // New state to track dropdown type

  const handleMobileChange = async (e) => {
    const input = e.target.value;
    setMobile(input);
    setDropdownType("mobile"); // Set dropdown type to "mobile"

    if (input?.length >= 4) {
      try {
        const response = await axios.get(
          `https://shiv-nursery.onrender.com/customers/searchByMobile`,
          {
            params: {
              mobile: input,
              page: 1,
              limit: 10,
            },
          }
        );
        setFilteredCustomers(response.data?.customers || []);
        setHighlightedIndex(-1); // Reset highlighted index
      } catch (error) {
        console.error("Error fetching customers:", error);
        setFilteredCustomers([]);
      }
    } else {
      setFilteredCustomers([]);
    }
  };

  const handleNameChange = async (e) => {
    const input = e.target.value;
    setCustomerName(input);
    setDropdownType("name"); // Set dropdown type to "name"

    if (input.length > 3) {
      try {
        const response = await axios.get(
          `https://shiv-nursery.onrender.com/customers/searchByName`,
          {
            params: {
              name: input,
              page: 1,
              limit: 10,
            },
          }
        );
        setFilteredCustomers(response.data?.customers || []);
        setHighlightedIndex(-1); // Reset highlighted index
      } catch (error) {
        console.error("Error fetching customers by name:", error);
        setFilteredCustomers([]);
      }
    } else {
      setFilteredCustomers([]);
    }
  };

  const handleKeyDown = (e) => {
    if (filteredCustomers.length === 0) return;

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredCustomers.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredCustomers.length - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleCustomerSelect(filteredCustomers[highlightedIndex]);
    }
  };

  const handleCustomerSelect = (customer) => {
    setMobile(customer.mobile);
    setCustomerName(customer.name);
    setFilteredCustomers([]);
    setHighlightedIndex(-1); // Reset highlighted index
  };

  const handleAddToCart = () => {
    const validPricePattern = /^\d+(\.\d+)?$/;
    if (!selectedFlower) {
      alert("Please select a flower");
      return;
    }
    if (!quantity) {
      alert("Please select a quantity");
      return;
    }
    if (!validPricePattern.test(price)) {
      alert("Please enter a valid price eg: 12.23");
      return;
    }

    const parsedPrice = parseFloat(price);
    const flower = flowers.find((f) => f.id === Number(selectedFlower));

    setCart([
      ...cart,
      {
        id: flower.id,
        name: flower.name,
        quantity,
        price: parsedPrice,
        total: quantity * parsedPrice,
      },
    ]);

    // Reset fields
    setSelectedFlower("");
    setPrice("");
    setQuantity(1);
  };

  const handlePlaceOrder = () => {
    alert("Order Placed Successfully");
    setSelectedFlower("");
    setPrice("");
    setQuantity(1);
    setCart([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-2xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Place Your Order
      </h2>

      {/* Mobile and Customer Name - Responsive Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mobile Input */}
        <div className="space-y-2 relative">
          <label className="block text-gray-700">
            Mobile<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={mobile}
            onChange={handleMobileChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter mobile number"
          />
          {dropdownType === "mobile" && filteredCustomers.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full mt-1 max-h-40 overflow-y-auto">
              {filteredCustomers.map((customer, index) => (
                <li
                  key={customer.mobile}
                  className={`p-2 cursor-pointer transition-colors duration-200 ${
                    highlightedIndex === index
                      ? "bg-blue-100 text-blue-800"
                      : "hover:bg-blue-100 hover:text-blue-800"
                  }`}
                  onClick={() => handleCustomerSelect(customer)}
                >
                  {customer.displayName}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Customer Name Input */}
        <div className="space-y-2 relative">
          <label className="block text-gray-700">
            Customer Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={customerName}
            onChange={handleNameChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter customer name"
          />
          {dropdownType === "name" && filteredCustomers.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full mt-1 max-h-40 overflow-y-auto">
              {filteredCustomers.map((customer, index) => (
                <li
                  key={customer.mobile}
                  className={`p-2 cursor-pointer transition-colors duration-200 ${
                    highlightedIndex === index
                      ? "bg-blue-100 text-blue-800"
                      : "hover:bg-blue-100 hover:text-blue-800"
                  }`}
                  onClick={() => handleCustomerSelect(customer)}
                >
                  {customer.name} - {customer.mobile}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Flower Type, Quantity, and Price - Responsive Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Flower Dropdown */}
        <div className="space-y-2">
          <label className="block text-gray-700">
            Flower Type<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2"
            value={selectedFlower || ""}
            onChange={(e) => setSelectedFlower(Number(e.target.value))}
          >
            <option value="" className="text-center">
              --none--
            </option>
            {flowers.map((flower) => (
              <option key={flower.id} value={flower.id} className="text-center">
                {flower.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity Input */}
        <div className="space-y-2">
          <label className="block text-gray-700">
            Quantity<span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg p-2 text-center"
            type="number"
            min="0"
            value={quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setQuantity(!isNaN(value) ? value : 0);
            }}
          />
        </div>

        {/* Price Input */}
        <div className="space-y-2">
          <label className="block text-gray-700">
            Price<span className="text-red-500">*</span>{" "}
            {price !== "" ? `₹${price}` : ""}
          </label>
          <input
            type="text"
            inputMode="decimal"
            className="w-full border border-gray-300 rounded-lg p-2 text-center"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-green-600 text-white py-2 rounded-lg"
      >
        Add to Cart
      </button>

      <OrderSummary
        cart={cart}
        setCart={setCart}
        setDeliveryDate={setDeliveryDate}
      />

      {cart.length > 0 && (
        <button
          onClick={handlePlaceOrder}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Place Order
        </button>
      )}
    </div>
  );
};

export default Flower;
