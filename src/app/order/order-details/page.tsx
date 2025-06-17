'use client'

import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import { updateform } from "../../../../store/formSlice";
import { useRouter } from "next/navigation";

const OrderDetails:React.FC=()=>{

  const [selectedFlower, setSelectedFlower] = useState<number | "">("");
  const [quantity,setQuantity]=useState<number>(1);
  const [price,setPrice]=useState<string>("");
  const dispatch= useDispatch();
  const router=useRouter();
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
    const handleAddToCart = () => {
        if (selectedFlower === "" || quantity <= 0 || price === "") {
            alert("Please fill in all required fields.");
            return;
        }
        const flower=flowers.find(f=>f.id === selectedFlower);
        dispatch(updateform({flowerType: flower?.name || "", flowerQuantity: quantity, flowerPrice: parseFloat(price)}));
        router.push("/order/order-summary");
    }
 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-4 bg-white rounded-2xl shadow-md space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Order Details
            </h2>
            <div className="space-y-2 ">
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
                min="0"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e)=>{
                    const value= parseInt(e.target.value);
                    setQuantity(!isNaN(value) ? value : 0)}}
                />
            </div>
            <div className="space-y-2">
                <label className="block text-gray-700">
                    Price<span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    inputMode="decimal"
                    className="w-full border border-gray-300 rounded-lg p-2 text-center"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <div className="flex justify-center items-center" onClick={handleAddToCart}>
                <button className="cursor-pointer mx-auto bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600">
                    Add to Cart
                </button>
            </div>
        </div>
        
    </div>
)   
}
export default OrderDetails;