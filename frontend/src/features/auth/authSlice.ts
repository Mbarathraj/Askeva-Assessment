import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import {
    loginAPI,
    logoutAPI,
    getProfileAPI,
} from "./authAPI";

import { AuthState } from "./authTypes";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    initialized: false,
    error: null,
};

export const login = createAsyncThunk(
    "auth/login",
    async (
        data: {
            email: string;
            password: string;
        },
        thunkAPI
    ) => {
        try {
            return await loginAPI(data);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);

export const getProfile = createAsyncThunk(
    "auth/profile",
    async (_, thunkAPI) => {
        try {
            return await getProfileAPI();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        await logoutAPI();
    }
);

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(login.pending, (state) => {
                state.loading = true;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;

                state.user = action.payload.user;

                state.isAuthenticated = true;
            })

            .addCase(login.rejected, (state, action: any) => {
                state.loading = false;

                state.error = action.payload;
            })

            .addCase(getProfile.pending, (state) => {
                state.loading = true;
            })

            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.initialized = true;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })

            .addCase(getProfile.rejected, (state) => {
                state.loading = false;
                state.initialized = true;
                state.user = null;
                state.isAuthenticated = false;
            })

            .addCase(logout.fulfilled, (state) => {
                state.user = null;

                state.isAuthenticated = false;
            });

    },
});

export default authSlice.reducer;