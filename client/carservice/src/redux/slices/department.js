import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

// Асинхронные действия
export const fetchDepartments = createAsyncThunk('departments/fetchDepartments', async () => {
    const { data } = await axios.get('/department');
    return data;
});

export const createDepartment = createAsyncThunk('departments/createDepartment', async (departmentData) => {
    const { data } = await axios.post('/department/create', departmentData);
    return data;
});

export const updateDepartment = createAsyncThunk('departments/updateDepartment', async ({ id, updatedData }) => {
    const { data } = await axios.patch(`/department/${id}/update`, updatedData);
    return data;
});

export const deleteDepartment = createAsyncThunk('departments/deleteDepartment', async (id) => {
    await axios.delete(`/department/${id}/delete`);
    return id;
});

const initialState = {
    departments: [], // Изменено на departments
    status: 'idle',
    error: null
};



const departmentsSlice = createSlice({
    name: 'departments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.departments = action.payload; // Теперь должно работать корректно
            })            
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createDepartment.fulfilled, (state, action) => {
                state.departments.push(action.payload);
            })
            .addCase(updateDepartment.fulfilled, (state, action) => {
                const index = state.departments.findIndex(department => department._id === action.payload._id);
                if (index !== -1) {
                    state.departments[index] = action.payload;
                }
            })
            .addCase(deleteDepartment.fulfilled, (state, action) => {
                state.departments = state.departments.filter(department => department._id !== action.payload);
            });
    }
});

export const departmentsReducer = departmentsSlice.reducer;
