import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// Define the shape of each item in the cart
interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

// Define props for the OrderSummary component
interface OrderSummaryProps {
  cart: CartItem[];
  deliveryDate: string;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setDeliveryDate: React.Dispatch<React.SetStateAction<string>>;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cart,deliveryDate, setCart,setDeliveryDate }) => {
  const [previousRemaining, setPreviousRemaining] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [amountPaid, setAmountPaid] = useState<string>("");
  const [balanceRemaining, setBalanceRemaining] = useState<string>("");

  const handleDelete = (deleteIndex: number) => {
    const updateCart = cart.filter((_, index) => index !== deleteIndex);
    setCart(updateCart);
  };

  const calculateBalance = () => {
    const totalOrderAmount = cart.reduce((sum, item) => sum + item.total, 0);
    const previous = parseFloat(previousRemaining) || 0;
    const discountValue = parseFloat(discount) || 0;
    const paid = parseFloat(amountPaid) || 0;

    const balance = totalOrderAmount + previous - discountValue - paid;
    setBalanceRemaining(balance.toFixed(2));
  };

  return (
    <>
      {cart.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
            Order Summary
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border text-center">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Flower</th>
                  <th className="p-2 border">Qty</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Total</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border">{item.quantity}</td>
                    <td className="p-2 border">₹{item.price}</td>
                    <td className="p-2 border">₹{item.total}</td>
                    <td className="p-2 border text-center">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleDelete(index)}
                        title="Delete item"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4">
            <div className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-fit text-right shadow-sm">
              <span className="text-lg font-semibold text-gray-700">
                Total Order Amount:&nbsp;
              </span>
              <span className="text-xl font-bold text-green-700">
                ₹{cart.reduce((sum, item) => sum + item.total, 0)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Previous Remaining */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Previous Remaining
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-1 w-full"
                value={previousRemaining}
                onChange={(e) => setPreviousRemaining(e.target.value)}
                placeholder="Enter previous remaining amount"
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Discount
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-1 w-full"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="Enter discount amount"
              />
            </div>

            {/* Amount Paid */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Amount Paid
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-1 w-full"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                placeholder="Enter amount paid"
              />
            </div>

            {/* Balance Remaining */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Balance Remaining
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-1 w-full"
                value={balanceRemaining}
                readOnly
                placeholder="Balance will be calculated"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <div className="mt-4 flex justify-center">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={calculateBalance}
            >
              Calculate Balance
            </button>
          </div>

          <div className="mt-4">
            <label className="block mb-1 text-gray-700 font-medium">
              Select Delivery Date
            </label>
            <input
              className="border border-gray-300 rounded-md px-3 py-1 w-full"
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default OrderSummary;
