import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios'; // Предполагается, что здесь импортирован axios для HTTP-запросов

// Асинхронные действия
export const fetchHazardousJobs = createAsyncThunk('hazardousJobs/fetchHazardousJobs', async () => {
    const { data } = await axios.get('/hazardousJobs');
    return data;
});

export const createHazardousJob = createAsyncThunk('hazardousJobs/createHazardousJob', async (hazardousJobData) => {
    const { data } = await axios.post('/hazardousJobs/create', hazardousJobData);
    return data;
});

export const updateHazardousJob = createAsyncThunk('hazardousJobs/updateHazardousJob', async ({ id, updatedData }) => {
    const { data } = await axios.patch(`/hazardousJobs/${id}/update`, updatedData);
    return data;
});

export const deleteHazardousJob = createAsyncThunk('hazardousJobs/deleteHazardousJob', async (id) => {
    await axios.delete(`/hazardousJobs/${id}/delete`);
    return id;
});

const initialState = {
    hazardousJobs: [],
    status: 'idle',
    error: null
};

const hazardousJobsSlice = createSlice({
    name: 'hazardousJobs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHazardousJobs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHazardousJobs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.hazardousJobs = action.payload;
            })
            .addCase(fetchHazardousJobs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createHazardousJob.fulfilled, (state, action) => {
                state.hazardousJobs.push(action.payload);
            })
            .addCase(updateHazardousJob.fulfilled, (state, action) => {
                const index = state.hazardousJobs.findIndex(job => job._id === action.payload._id);
                if (index !== -1) {
                    state.hazardousJobs[index] = action.payload;
                }
            })
            .addCase(deleteHazardousJob.fulfilled, (state, action) => {
                state.hazardousJobs = state.hazardousJobs.filter(job => job._id !== action.payload);
            });
    }
});

export const hazardousJobsReducer = hazardousJobsSlice.reducer;
