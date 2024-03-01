import React from 'react';
import { Typography, Link, List, ListItem, ListItemText } from '@mui/material';

const HomePage = () => {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Добро пожаловать в систему учета допуска сотрудников к опасным работам!
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '2rem' }}>
                Наша система предназначена для эффективного управления и контроля доступа сотрудников к опасным видам работ.
                Мы обеспечиваем безопасность на рабочем месте и минимизируем риски, связанные с выполнением опасных работ.
                Наша система позволяет регистрировать сотрудников, управлять их доступом к определенным видам работ,
                а также отслеживать и анализировать данные о прохождении обучения по безопасности.
            </Typography>
            <Typography variant="h4" gutterBottom>
                Основные функции системы:
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="Регистрация сотрудников и учет их персональных данных." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Управление допуском сотрудников к опасным видам работ." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Отслеживание прохождения обучения по безопасности и получения необходимых сертификатов." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Генерация отчетов о состоянии допуска сотрудников к работам." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Интеграция с другими системами учета и безопасности." />
                </ListItem>
            </List>
        </div>
    );
};

export default HomePage;
