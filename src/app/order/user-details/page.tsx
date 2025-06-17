'use client'

import React, {ChangeEvent, useState} from "react";
import { Customer } from "../../../../interfaces/customerInterface";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { updateform } from "../../../../store/formSlice";

const customers: Customer[] = [
  { phoneNumber: 9987481238, name: "Atul N Thorat" },
  { phoneNumber: 7977491293, name: "Amol N Thorat" },
  { phoneNumber: 9665525259, name: "Amit A Thorat" },
  { phoneNumber: 9960078709, name: "Atish A Thorat" },
  { phoneNumber: 7709202071, name: "Kunal P Thorat" },
  { phoneNumber: 9867057131, name: "Vivek M Thorat" },
  { phoneNumber: 9503367666, name: "Kiran A Thorat" },
  { phoneNumber: 9730922432, name: "Kishor A Thorat" },
  { phoneNumber: 9167130742, name: "Shubham D Thorat" },
];

const UserDetails: React.FC = () => {
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [customerName, setCustomerName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const router = useRouter();
  const form= useSelector((state: RootState)=>state.form);
  const dispatch = useDispatch();

const handleCustomerSelect = (customer: Customer) => {
    setPhoneNumber(customer.phoneNumber.toString());
    setCustomerName(customer.name);
    setFilteredCustomers([]);
  };
  const handleMobileNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      setPhoneNumber(input);
  
      if (input) {
        const filtered = customers.filter((customer) =>
          customer.phoneNumber.toString().startsWith(input)
        );
        setFilteredCustomers(filtered);
      } else {
        setFilteredCustomers([]);
      }
    };
  const handleNext = () => {
    if (!phoneNumber || !customerName) {
      alert("Please fill in all required fields.");
      return;
    }
    if(phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    dispatch(updateform({customerPhoneNumber:phoneNumber, customerName}));
    router.push("/order/order-details");
  }
return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div className="w-full max-w-md p-4 bg-white rounded-2xl shadow-md space-y-6 ">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Customer Details
      </h2>

      <div className="flex flex-col gap-8">
        <div className="space-y-2 relative">
          <label className="block text-gray-700">
            Mobile<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={phoneNumber}
            onChange={handleMobileNumberChange}
            placeholder="Enter mobile number"
          />
          {filteredCustomers.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full mt-1 max-h-40 overflow-y-auto">
              {filteredCustomers.map((customer) => (
                <li
                  key={customer.phoneNumber}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCustomerSelect(customer)}
                >
                  {customer.phoneNumber} - {customer.name}
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
      <div className="flex justify-between items-center">
      <button 
      onClick={handleNext}
      className="cursor-pointer bg-blue-500 px-8 py-3 mx-auto text-white rounded-lg hover:bg-blue-600">
        Next
      </button>
      </div>
    </div>
  </div>
)}

export default UserDetails;