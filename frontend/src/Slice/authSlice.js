import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from '../Services/AuthService'
import { toast } from 'react-toastify'
import { addLocalStorageUser,getLocalStorageUser,deleteLocalStorageUser } from "../Services/localStorage";

const user = getLocalStorageUser()

const initialState = {
    user: user ? user : '',
    users: [],
    error: false,
    loading: false,
    message: ''
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const logout = createAsyncThunk('auth/logout', (_, thunkAPI) => {
    try {
      return authService.logout()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false
            state.error = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.loading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            addLocalStorageUser(action.payload)
            toast.success('User Successfully Registered')
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false
            state.error = true
            state.message = action.payload
            state.user = null
            toast.error('Please Try Again!')
        })
        .addCase(login.pending, (state) => {
            state.loading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            addLocalStorageUser(action.payload)
            toast.success('User Successfully Login')
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = true
            state.message = action.payload
            state.user = null
             toast.error('Incorrect Username or Password. Please Try Again!')
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
            deleteLocalStorageUser()
            toast.success('User Logout')
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer
