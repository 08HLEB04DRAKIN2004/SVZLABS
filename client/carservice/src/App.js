import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import { CssBaseline, Box } from '@mui/material';

import LoginPage from './components/login';
import RegistrationPage from './components/register';
import Header from './components/header';
import HomePage from './components/homepage';
import Footer from './components/footer';
import EmployeeAccess from './components/employeeAccess';
import Position from './components/position';
import HazardousJobs from './components/hazardousJob';
import DepartmentPage from './components/departmentPage'; // Импортируем компонент DepartmentPage
import Admin from './components/admin'
import AdminEmployeeAccess from './components/adminemployeeaccess';
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    if (window.localStorage.getItem('token')) {
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
            <Route path="/admin" element={<Admin />} /> {/* Роут для страницы администратора */}
            <Route path="/Admin-Employee-Access" element={<AdminEmployeeAccess />} /> {/* Роут для страницы администратора */}
            <Route path='/departments' element={<DepartmentPage />} /> {/* Добавляем маршрут для страницы с департаментами */}
            {!isAuth && <Route path='/registration' element={<RegistrationPage/>} />}
            {!isAuth && <Route path='/login' element={<LoginPage/>} />}
            {isAuth && <Route path="*" element={<Navigate to="/" />} />}
            {!isAuth && <Route path="*" element={<Navigate to="/login" />} />}
          </Routes>
        </Box>
        <Footer />
      </Box>
    </div>
  );
}

export default App;
