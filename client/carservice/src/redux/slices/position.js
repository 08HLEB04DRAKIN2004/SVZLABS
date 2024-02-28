import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

// Асинхронные действия
export const fetchPositions = createAsyncThunk('positions/fetchPositions', async () => {
    const { data } = await axios.get('/positions');
    return data;
});

export const createPosition = createAsyncThunk('positions/createPosition', async (positionData) => {
    const { data } = await axios.post('/positions/create', positionData);
    return data;
});

export const updatePosition = createAsyncThunk('positions/updatePosition', async ({ id, updatedData }) => {
    const { data } = await axios.patch(`/positions/${id}/update`, updatedData);
    return data;
});

export const deletePosition = createAsyncThunk('positions/deletePosition', async (id) => {
    await axios.delete(`/positions/${id}/delete`);
    return id;
});

const initialState = {
    positions: [],
    status: 'idle',
    error: null
};

const positionsSlice = createSlice({
    name: 'positions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPositions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPositions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.positions = action.payload;
            })
            .addCase(fetchPositions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createPosition.fulfilled, (state, action) => {
                state.positions.push(action.payload);
            })
            .addCase(updatePosition.fulfilled, (state, action) => {
                const index = state.positions.findIndex(position => position._id === action.payload._id);
                if (index !== -1) {
                    state.positions[index] = action.payload;
                }
            })
            .addCase(deletePosition.fulfilled, (state, action) => {
                state.positions = state.positions.filter(position => position._id !== action.payload);
            });
    }
});

export const positionsReducer = positionsSlice.reducer;
