import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";

import employeeReducer from "../features/employee/employeeSlice";

import dashboardReducer from "../features/dashboard/dashboardSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employee: employeeReducer,
        dashboard: dashboardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;