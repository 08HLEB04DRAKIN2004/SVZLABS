import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

// Асинхронные действия
export const fetchEmployeeAccess = createAsyncThunk('employeeAccess/fetchEmployeeAccess', async () => {
    const { data } = await axios.get('/employeeAccess');
    return data;
});

export const createEmployeeAccess = createAsyncThunk('employeeAccess/createEmployeeAccess', async (employeeAccessData) => {
    const { data } = await axios.post('/employeeAccess/create', employeeAccessData);
    return data;
});

export const updateEmployeeAccess = createAsyncThunk('employeeAccess/updateEmployeeAccess', async ({ id, updatedData }) => {
    const { data } = await axios.patch(`/employeeAccess/${id}/update`, updatedData);
    return data;
});

export const deleteEmployeeAccess = createAsyncThunk('employeeAccess/deleteEmployeeAccess', async (id) => {
    await axios.delete(`/employeeAccess/${id}/delete`);
    return id;
});

const initialState = {
    employeeAccess: [],
    status: 'idle',
    error: null
};

const employeeAccessSlice = createSlice({
    name: 'employeeAccess',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeAccess.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployeeAccess.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.employeeAccess = action.payload;
            })
            .addCase(fetchEmployeeAccess.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createEmployeeAccess.fulfilled, (state, action) => {
                state.employeeAccess.push(action.payload);
            })
            .addCase(updateEmployeeAccess.fulfilled, (state, action) => {
                const index = state.employeeAccess.findIndex(access => access._id === action.payload._id);
                if (index !== -1) {
                    state.employeeAccess[index] = action.payload;
                }
            })
            .addCase(deleteEmployeeAccess.fulfilled, (state, action) => {
                state.employeeAccess = state.employeeAccess.filter(access => access._id !== action.payload);
            });
    }
});

export const employeeAccessReducer = employeeAccessSlice.reducer;
