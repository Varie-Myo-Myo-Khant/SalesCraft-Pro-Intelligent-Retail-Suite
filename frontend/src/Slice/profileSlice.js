import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "../Services/ProfileService";
import { toast } from "react-toastify"; 


const initialState = { 
    profile:{},
    error: false,
    loading: false,
};

export const updateProfile = createAsyncThunk('profile/updateProfile', async ({userId,profile}, thunkAPI) => {
    try {
       return await profileService.updateProfile(userId,profile)
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
})


//to filter category with name
export const getProfile = createAsyncThunk('profile/getProfile', async (userId, thunkAPI) => {
    try { 
        console.log("slice",userId)
       return await profileService.getCurrentUserProfile(userId)
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearValues: () => {
            return { ...initialState };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                toast.success('Updated the Category!')
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                toast.error('Fail! Please try again later!')
            })
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false; 
                state.profile = action.payload; 
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
           
    }
});

export const { handleChange, clearValues } = profileSlice.actions;
export default profileSlice.reducer;
