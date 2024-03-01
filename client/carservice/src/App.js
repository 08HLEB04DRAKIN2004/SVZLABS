import React, { useEffect } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import { CssBaseline, Box } from '@mui/material';
import './App.css'
import LoginPage from './components/login';
import RegistrationPage from './components/register';
import Header from './components/header';
import HomePage from './components/homepage';
import Footer from './components/footer';
import EmployeeAccess from './components/employeeAccess';
import Position from './components/position';
import HazardousJobs from './components/hazardousJob';
import DepartmentPage from './components/departmentPage';
import Admin from './components/admin'
import AdminEmployeeAccess from './components/adminemployeeaccess';
import DepartmentAdmin from './components/departmentAdmin';
import AdminPosition from './components/positionadmin';
import HazardousJobjAdmin from './components/hazardousJobjadmin';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  return (
    <div className="App" style={{ overflowX: 'hidden' }}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box component="main" flexGrow={1} sx={{ width: '100%' }}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/employee-access' element={<EmployeeAccess />} />
            <Route path='/positions' element={<Position />} />
            <Route path='/hazardous-jobs' element={<HazardousJobs />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/Admin-Employee-Access" element={<AdminEmployeeAccess />} />
            <Route path="/admin-positions" element={<AdminPosition/>} />
            <Route path='/departments' element={<DepartmentPage />} />
            <Route path="/hazardous-jobs-admin" element={<HazardousJobjAdmin/>} />
            <Route path='/registration' element={<RegistrationPage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/admin-departments' element={<DepartmentAdmin />} />
            {isAuth ? <Route path="*" element={<Navigate to="/" />} /> : <Route path="*" element={<Navigate to="/login" />} />}
          </Routes>
        </Box>
        <Footer />
      </Box>
    </div>
  );
}

export default App
