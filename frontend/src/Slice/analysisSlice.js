import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import analysisService from "../Services/AnalysisService";

export const fetchPromotionData = createAsyncThunk('analysis/fetchPromotionData', async (_, thunkAPI) => {
    try {
        // Fetch promotion data from the backend
        const promotionData = await analysisService.getPromotionAnalysisData();
        return promotionData.associationRules; // Extract association rules from the response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Define initial state
const initialState = {
    promotionData: [],
    loading: false,
    error: null
};

// Create the slice
const analysisSlice = createSlice({
    name: 'analysis',
    initialState,
    reducers: {
        // Add any reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPromotionData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPromotionData.fulfilled, (state, action) => {
                state.loading = false;
                state.promotionData = action.payload;
            })
            .addCase(fetchPromotionData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default analysisSlice.reducer;