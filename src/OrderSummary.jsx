import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const OrderSummary= ({cart,setCart}) => {
    const [deliveryDate, setDeliveryDate] = useState("");

    const handleDelete=(deleteIndex)=>{
        const updateCart=cart.filter((item,index)=> index!= deleteIndex)
        setCart(updateCart)
    }
    
    return (
        <>
            {cart.length > 0 &&
                (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                        <table className="w-full border text-center">
                            <thead>
                                <tr className="bg-gray-200">
                                <th className="p-2 border">Flower</th>
                                <th className="p-2 border">Qty</th>
                                <th className="p-2 border">Price</th>
                                <th className="p-2 border">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item,index)=>{
                                    return (
                                    <>
                                         <tr key={index} className="border-t">
                                            <td className="p-2 border">{item.name}</td>
                                            <td className="p-2 border">{item.quantity}</td>
                                            <td className="p-2 border">{item.price}₹</td>
                                            <td className="p-2 border">{item.total}₹</td>
                                            <td className="p-2 border text-center">
                                            <FontAwesomeIcon 
                                            icon={faTrash}
                                            className="text-red-600 cursor-pointer"
                                            onClick={() => handleDelete(index)}
                                            title="Delete item"
                                            />
                                            </td>
                                        </tr>
                                    </>
                                    )    
                                })}
                            </tbody>
                        </table>
                        <div className="flex justify-center mt-4">
                            <div className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-fit text-right shadow-sm">
                                <span className="text-lg font-semibold text-gray-700">
                                Total Order Amount:&nbsp;
                                </span>
                                <span className="text-xl font-bold text-green-700">
                                {cart.reduce((sum, item) => sum + item.total, 0)}₹
                                </span>
                            </div>
                        </div>

                        <div className="mt-4">
                           <label className="block mb-1 text-gray-700 font-medium">
                            Select Delivery Date
                            </label>
                            <input 
                            className="border border-gray-300 rounded-md px-3 py-1"
                            type="date"
                            value={deliveryDate}
                            onChange={(e)=>setDeliveryDate(e.target.value)}
                            />     
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default OrderSummary;