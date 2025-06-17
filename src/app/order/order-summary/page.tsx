'use client';
import React, { useState } from 'react';
import { RootState } from '../../../../store/store';
import { useSelector } from 'react-redux';

const OrderSummary:React.FC = () => {
      const [previousRemaining, setPreviousRemaining] = useState<string>("");
      const [discount, setDiscount] = useState<string>("");
      const [amountPaid, setAmountPaid] = useState<string>("");
      const [balanceRemaining, setBalanceRemaining] = useState<string>("");
      const form= useSelector((state: RootState)=>state.form);

      const calculateBalance = () => {
        // const totalOrderAmount = cart.reduce((sum, item) => sum + item.total, 0);
        const previous = parseFloat(previousRemaining) || 0;
        const discountValue = parseFloat(discount) || 0;
        const paid = parseFloat(amountPaid) || 0;

        // const balance = totalOrderAmount + previous - discountValue - paid;
        // setBalanceRemaining(balance.toFixed(2));
      }
      
return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-4 bg-white rounded-2xl shadow-md space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Order Summary
            </h2>
            <div className='space-y-2'>
              <label className="block text-gray-700 font-medium">
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
            <div className='space-y-2'>
              <label className="block text-gray-700 font-medium">
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
            <div className='space-y-2'>
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
            <div className='flex flex-col items-center gap-3'>
                {balanceRemaining && <div className='inline-flex items-center gap-2'>
                   <span className='text-amber-500 font-medium'>Balance Remaining:</span>
                   <span className='text-slate-600 font-semibold'>{balanceRemaining}</span>
                </div>}
                <button
                    className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md"
                      onClick={calculateBalance}
                    >
                    Calculate Balance
                </button>
            </div>

        </div>
    </div>
)
}
export default OrderSummary;