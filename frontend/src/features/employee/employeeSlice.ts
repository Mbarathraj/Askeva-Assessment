import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import {
    createEmployeeAPI,
    deleteEmployeeAPI,
    getEmployeeAPI,
    getEmployeesAPI,
    updateEmployeeAPI,
} from "./employeeAPI";

import {
    EmployeeState,
} from "./employeeTypes";

const initialState: EmployeeState = {

    employees: [],

    employee: null,

    pagination: null,

    loading: false,

    error: null,

};

export const getEmployees =
    createAsyncThunk(
        "employee/getEmployees",

        async (
            params: any,
            thunkAPI
        ) => {

            try {

                return await getEmployeesAPI(params);

            } catch (error: any) {

                return thunkAPI.rejectWithValue(
                    error.response.data.message
                );

            }

        }
    );

export const getEmployee =
    createAsyncThunk(
        "employee/getEmployee",

        async (
            id: string,
            thunkAPI
        ) => {

            try {

                return await getEmployeeAPI(id);

            } catch (error: any) {

                return thunkAPI.rejectWithValue(
                    error.response.data.message
                );

            }

        }
    );

export const createEmployee =
    createAsyncThunk(
        "employee/createEmployee",

        async (
            data: any,
            thunkAPI
        ) => {

            try {

                return await createEmployeeAPI(data);

            } catch (error: any) {

                return thunkAPI.rejectWithValue(
                    error.response.data.message
                );

            }

        }
    );

export const updateEmployee =
    createAsyncThunk(
        "employee/updateEmployee",

        async (
            {
                id,
                data,
            }: any,
            thunkAPI
        ) => {

            try {

                return await updateEmployeeAPI(
                    id,
                    data
                );

            } catch (error: any) {

                return thunkAPI.rejectWithValue(
                    error.response.data.message
                );

            }

        }
    );

export const deleteEmployee =
    createAsyncThunk(
        "employee/deleteEmployee",

        async (
            id: string,
            thunkAPI
        ) => {

            try {

                await deleteEmployeeAPI(id);

                return id;

            } catch (error: any) {

                return thunkAPI.rejectWithValue(
                    error.response.data.message
                );

            }

        }
    );

const employeeSlice =
    createSlice({

        name: "employee",

        initialState,

        reducers: {},

        extraReducers: builder => {

            builder

                .addCase(
                    getEmployees.pending,
                    state => {

                        state.loading = true;

                    }
                )

                .addCase(
                    getEmployees.fulfilled,
                    (
                        state,
                        action
                    ) => {

                        state.loading = false;

                        state.employees =
                            action.payload.data;

                        state.pagination =
                            action.payload.pagination;

                    }
                )
                .addCase(
                    updateEmployee.fulfilled,
                    (state, action) => {

                        state.employee =
                            action.payload.data;

                        state.employees =
                            state.employees.map(emp =>
                                emp._id === action.payload.data._id
                                    ? action.payload.data
                                    : emp
                            );

                    }
                )

                .addCase(
                    getEmployees.rejected,
                    (
                        state,
                        action: any
                    ) => {

                        state.loading = false;

                        state.error =
                            action.payload;

                    }
                )

                .addCase(
                    getEmployee.fulfilled,
                    (
                        state,
                        action
                    ) => {

                        state.employee =
                            action.payload.data;

                    }
                )

                .addCase(
                    createEmployee.fulfilled,
                    (
                        state,
                        action
                    ) => {

                        state.employees.unshift(
                            action.payload.data
                        );

                    }
                )

                .addCase(deleteEmployee.pending, (state) => {
                    state.loading = true;
                })

                .addCase(deleteEmployee.fulfilled, (state, action) => {
                    state.loading = false;

                    state.employees = state.employees.filter(
                        emp => emp._id !== action.payload
                    );
                })

                .addCase(deleteEmployee.rejected, (state) => {
                    state.loading = false;
                })

        },

    });

export default employeeSlice.reducer;