import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import sessionService from "../Services/SessionService";
import { toast } from "react-toastify"; 

const initialState = {
    sessions: [],
    sessionId: null,
    openingCash: 0,
    closingCash: 0,
    userId: '',
    error: false,
    loading: false,
    isEditing: false,
    editSessionId: '',
};

export const sessionCreate = createAsyncThunk('session/sessionCreate', async (session, thunkAPI) => {
    try {
        const sessionId = await sessionService.sessionCreate(session);
        thunkAPI.dispatch(setSessionId(sessionId));
        return sessionId;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const updateSession = createAsyncThunk('session/updateSession', async ({ sessionId, session }, thunkAPI) => {
    try {
        console.log({ sessionId, session })
       return await sessionService.updateSession(sessionId, session);
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const deleteSession = createAsyncThunk('session/deleteSession', async (sessionId, thunkAPI) => {
    try {
       await sessionService.deleteSession(sessionId);
       return sessionId;
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getSessions = createAsyncThunk('session/getSessions', async (_, thunkAPI) => {
    try {
        const response = await sessionService.getSession();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSessionId: (state, action) => {
            state.sessionId = action.payload;
        },
        handleChange: (state, { payload: { name, value } }) => {
            state[name] = value;
        },
        setEditSession: (state, action) => {
            state.isEditing = true;
            state.editSessionId = action.payload.sessionId;
            state.openingCash = action.payload.openingCash;
            // other properties...
        },
        clearValues: (state) => {
            state.openingCash = 0;
            state.closingCash = 0;
            state.sessionId='';
            state.userId = '';
            // clear other properties...
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sessionCreate.pending, (state) => {
                state.loading = true;
            })
            .addCase(sessionCreate.fulfilled, (state, action) => {
                state.loading = false;
                state.sessionId = action.payload;
                toast.success('Successfully Added New Session!');
            })
            .addCase(sessionCreate.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                toast.error('Failed to create session. Please try again later.');
            })
            .addCase(updateSession.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateSession.fulfilled, (state) => {
                state.loading = false;
                 state.sessionId = '';
                toast.success('Session updated successfully.');
            })
            .addCase(updateSession.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                toast.error('Failed to update session. Please try again later.');
            })
            .addCase(deleteSession.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSession.fulfilled, (state, action) => {
                state.loading = false;
                state.sessions = state.sessions.filter(session => session.id !== action.payload);
                toast.success('Session deleted successfully.');
            })
            .addCase(deleteSession.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                toast.error('Failed to delete session. Please try again later.');
            })
            .addCase(getSessions.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSessions.fulfilled, (state, action) => {
                state.loading = false;
                state.sessions = action.payload;
            })
            .addCase(getSessions.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                toast.error('Failed to fetch sessions. Please try again later.');
            });
    }
});

export const { setSessionId, handleChange, setEditSession, clearValues } = sessionSlice.actions;
export default sessionSlice.reducer;
