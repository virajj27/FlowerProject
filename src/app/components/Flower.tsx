"use client";

import React, { useState, ChangeEvent } from "react";
import OrderSummary from "./OrderSummary";

interface FlowerItem {
  id: number;
  name: string;
}

interface Customer {
  mobile: number;
  name: string;
}

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

const Flower: React.FC = () => {
  const flowers: FlowerItem[] = [
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

  const customers: Customer[] = [
    { mobile: 9987481238, name: "Atul N Thorat" },
    { mobile: 7045235938, name: "Atul Navanath Thorat" },
    { mobile: 7977491293, name: "Amol N Thorat" },
    { mobile: 9665525259, name: "Amit A Thorat" },
    { mobile: 9960078709, name: "Atish A Thorat" },
    { mobile: 7709202071, name: "Kunal P Thorat" },
    { mobile: 9867057131, name: "Vivek M Thorat" },
    { mobile: 9503367666, name: "Kiran A Thorat" },
    { mobile: 9730922432, name: "Kishor A Thorat" },
    { mobile: 9167130742, name: "Shubham D Thorat" },
  ];

  const [selectedFlower, setSelectedFlower] = useState<number | "">("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

  const handleMobileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setMobile(input);

    if (input) {
      const filtered = customers.filter((customer) =>
        customer.mobile.toString().startsWith(input)
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers([]);
    }
  };

  const handleCustomerSelect = (customer: Customer) => {
    setMobile(customer.mobile.toString());
    setCustomerName(customer.name);
    setFilteredCustomers([]);
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
    if (!flower) return;

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
    setCustomerName("");
    setMobile("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-2xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Place Your Order
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 relative">
          <label className="block text-gray-700">
            Mobile<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={mobile}
            onChange={handleMobileChange}
            placeholder="Enter mobile number"
          />
          {filteredCustomers.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full mt-1 max-h-40 overflow-y-auto">
              {filteredCustomers.map((customer) => (
                <li
                  key={customer.mobile}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCustomerSelect(customer)}
                >
                  {customer.mobile} - {customer.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700">
            Customer Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-gray-700">
            Flower Type<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2"
            value={selectedFlower}
            onChange={(e) => setSelectedFlower(Number(e.target.value))}
          >
            <option value="">--none--</option>
            {flowers.map((flower) => (
              <option key={flower.id} value={flower.id}>
                {flower.name}
              </option>
            ))}
          </select>
        </div>

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
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-green-600 text-white py-2 rounded-lg"
      >
        Add to Cart
      </button>

      <OrderSummary
        cart={cart}
        deliveryDate={deliveryDate}
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
