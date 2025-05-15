import React, { useState } from "react";
import OrderSummary from "./OrderSummary";

const Flower = () => {
  const flowers = [
    { id: 1, name: "Aishwarya " },
    { id: 2, name: "Bhagyashree" },
    { id: 3, name: "Culcutta white" },
    { id: 4, name: "Lavender Pink" },
    { id: 5, name: "Madhuri" },
    { id: 6, name: "Meghna" },
    { id: 7, name: "Pournima" },
    { id: 8, name: "Pramila" },
    { id: 9, name: "Purple" },
    { id: 10, name: "Scent white" },
    { id: 11, name: "Scent yellow" },
    { id: 12, name: "Suvarna" },
    { id: 13, name: "Suvidha" },
    { id: 14, name: "Shanka" },
  ];

  const [selectedFlower, setSelectedFlower] = useState();
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleAddToCart = () => {
    const validPricePattern = /^\d+(\.\d+)?$/;
    if(!selectedFlower){
      alert("Please select a flower");
      return; 
    }
    if(!quantity){
      alert("Please select a quantity");
      return;
    }
    if(!validPricePattern.test(price)){
      alert("Please enter a valid price eg: 12.23");
      return;
    }

    const parsedPrice = parseFloat(price);
    const flower = flowers.find(f => f.id === Number(selectedFlower));

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
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Choose Your Flower</h2>

      {/* Flower Dropdown */}
      <div className="space-y-2">
        <label className="block text-gray-700">Flower</label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2"
          value={selectedFlower || ""}
          onChange={(e) => setSelectedFlower(Number(e.target.value))}
        >
          <option value="" className="text-center">--none--</option>
          {flowers.map((flower) => (
            <option key={flower.id} value={flower.id} className="text-center">
              {flower.name}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
          <label>Customer Name:</label>
      </div>

      {/* Quantity Input */}
      <div className="space-y-2">
        <label className="block text-gray-700">Quantity</label>
        <input
          className="w-full border border-gray-300 rounded-lg p-2 text-center"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setQuantity(!isNaN(value) ? value : 0);
          }}
        />
      </div>

      {/* Price Input */}
      <div className="space-y-2">
        <label className="block text-gray-700">Price: {price !== "" ? `₹${price}` : ""}</label>
        <input
          type="text"
          inputMode="decimal"
          className="w-full border border-gray-300 rounded-lg p-2 text-center"
          value={price}
          onChange={(e) => {
            // Always allow typing
            setPrice(e.target.value);
          }}
        />
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-green-600 text-white py-2 rounded-lg"
      >
        Add to Cart
      </button>

      <OrderSummary cart={cart} setCart={setCart} setDeliveryDate={setDeliveryDate}/>

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
