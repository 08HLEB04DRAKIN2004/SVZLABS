import React from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import avatar from '../../src/media/avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../redux/slices/auth';

function Header() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const userData = useSelector((state) => state.auth.data);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onClickLogout = () => {
        if (window.confirm('Вы действительно хотите выйти из учетной записи?')) {
            dispatch(logout());
            window.localStorage.removeItem('token');
        }
    };

    // Проверяем, есть ли у пользователя роль администратора
    const isAdmin = userData && userData.role === 'admin';

    return (
        <AppBar position="static" sx={{ backgroundColor: '#333' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
                        <Typography variant="body1">Главная</Typography>
                    </Link>
                    <Link to="/employee-access" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
                        <Typography variant="body1">Учет доступа</Typography>
                    </Link>
                    <Link to="/positions" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
                        <Typography variant="body1">Должности</Typography>
                    </Link>
                    <Link to="/hazardous-jobs" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
                        <Typography variant="body1">Опасные работы</Typography>
                    </Link>
                    <Link to="/departments" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
                        <Typography variant="body1">Отделы</Typography>
                    </Link>
                    {isAdmin && (
                        <Link to="/admin" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
                            <Typography variant="body1">Admin</Typography>
                        </Link>
                    )}
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginLeft: 'auto' }}>
                            <img src={avatar} alt="Avatar" style={{ marginRight: '10px', height: '30px' }} />
                        </IconButton>
                    </Tooltip>
                    {isAuth ? (
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem>
                                <Typography onClick={onClickLogout}>Выйти</Typography>
                            </MenuItem>
                        </Menu>
                    ) : (
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem>
                                <Link to={'/login'} style={{ textAlign: 'center', textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                    <Typography>Войти</Typography>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to={'/registration'} style={{ textAlign: 'center', textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                    <Typography>Создать аккаунт</Typography>
                                </Link>
                            </MenuItem>
                        </Menu>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
