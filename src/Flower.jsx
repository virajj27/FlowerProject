import React, { useState } from "react";
import OrderSummary from "./OrderSummary";

const Flower = () => {
  const flowers = [
    { id: 1, name: "Rose" },
    { id: 2, name: "Tulip" },
    { id: 3, name: "Lily" },
    { id: 4, name: "Orchid" },
  ];

  const [selectedFlower, setSelectedFlower] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const handleAddToCart = () => {
    if (!selectedFlower || quantity <= 0 || price <= 0) {
      alert("Please select a flower, quantity, and price.");
      return;
    }
    const flower = flowers.find(f => f.id === Number(selectedFlower));
    setCart([
      ...cart,
      {
        id: flower.id,
        name: flower.name,
        quantity,
        price,
        total: quantity * price
      }
    ]);
    setSelectedFlower("");
    setPrice(0);
    setQuantity(1);
    }
    const HandlePlaceOrder=()=>{
        alert("Order Placed Successfully");
        setSelectedFlower("");
        setPrice(0);
        setQuantity(1);
        setCart([])
        return;
    }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Choose Your Flower</h2>

      {/* Flower Dropdown */}
      <div className="space-y-2">
        <label className="block text-gray-700">Flower</label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2"
          value={selectedFlower}
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
          {/* Quantity measure*/}
      <div className="space-y-2">
        <label className="block text-gray-700">Quantity</label>
          <input
          className="w-full border border-gray-300 rounded-lg p-2 text-center"
          value={quantity}  
          onChange={(e) => setQuantity(Number(e.target.value))}
          />
      </div>

      {/* Price  */}
      <div className="space-y-2">
        <label className="block text-gray-700">Price: {price}₹</label>
        <input
          type="number"
          step="0.01"
          className="w-full border border-gray-300 rounded-lg p-2 text-center"
          value={price}  
          onChange={(e) => {
            const value=parseFloat((e.target.value))
            setPrice(!isNaN(value)? value:0)
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
      <OrderSummary cart={cart} setCart={setCart}/>

      {cart.length>0 && (
        <button
            onClick={HandlePlaceOrder}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
        >
            Place Order
        </button>
    )}
    </div>
  );
};

export default Flower;
