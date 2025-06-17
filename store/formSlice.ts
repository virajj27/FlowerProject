'use client'

import { createSlice,PayloadAction } from "@reduxjs/toolkit"

interface FormState{
    customerName: string;
    customerPhoneNumber: string;
    flowerType: string;
    flowerQuantity: number;
    flowerPrice: number;
    previousRemainingAmount: number;
    discountAmount: number;
    paidAmount: number;
    remainingBalanceAmount: number;
    deliveryDate: string;
}

const initialState : FormState={
    customerName: '',
    customerPhoneNumber: '',
    flowerType: '',
    flowerQuantity: 0,
    flowerPrice: 0,
    previousRemainingAmount: 0,
    discountAmount: 0,
    paidAmount: 0,
    remainingBalanceAmount: 0,
    deliveryDate: new Date().toISOString(),
}

const formSlice= createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateform: (state,action: PayloadAction<Partial<FormState>>) => {
            return {...state, ...action.payload}
        },
        resetForm:()=>initialState
    }
})


export const { updateform, resetForm } = formSlice.actions;
export default formSlice.reducer;