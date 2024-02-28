import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { departmentsReducer } from './slices/department';
import { employeeAccessReducer } from './slices/employeeAccess';
import { positionsReducer } from './slices/position';
import { hazardousJobsReducer } from './slices/hazardousJob';


const store = configureStore({
    reducer: {
        auth: authReducer,
        departments: departmentsReducer,
        employeeAccess:employeeAccessReducer,
        positions:positionsReducer,
        hazardousJobs:hazardousJobsReducer
    }
});

export default store;