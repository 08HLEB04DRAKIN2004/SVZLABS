import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

function Admin() {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Панель администратора
            </Typography>
            <List>
                <ListItem button component={Link} to="/admin-employee-access">
                    <ListItemText primary="Учет доступа сотрудников" />
                </ListItem>
                <ListItem button component={Link} to="/admin-departments">
                    <ListItemText primary="Управление департаментами" />
                </ListItem>
                <ListItem button component={Link} to="/admin-positions">
                    <ListItemText primary="Управление должностями" />
                </ListItem>
                <ListItem button component={Link} to="/hazardous-jobs-admin">
                    <ListItemText primary="Управление опасными работами" />
                </ListItem>
                {/* Добавьте другие ссылки на административные функции, если необходимо */}
            </List>
        </div>
    );
}

export default Admin;
