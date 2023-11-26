import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:"tutor",
    initialState:{
        user:null,
    },
    reducers:{
        createAccount: (state,action)=>{   
            state.user = action.payload;
        },
        saveInfo:(state,action)=>{
            state.user = {...state.user,...action.payload};
        },
        saveFinancialData:(state,action)=>{
            state.user =  {...state.user,...action.payload}
        }
        
    }
})

export const {createAccount,saveInfo,saveFinancialData} = userSlice.actions;
export default userSlice.reducer