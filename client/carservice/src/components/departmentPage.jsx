import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '../redux/slices/department'; // Импортируем нужный thunk для загрузки данных отделов
import { Grid, Card, CardContent, Typography} from '@mui/material';

const DepartmentPage = () => {
    const dispatch = useDispatch();
    const departments = useSelector(state => state.departments.departments); // Получаем данные о отделах из хранилища
    const loading = useSelector(state => state.departments.status) === 'loading'; // Проверяем статус загрузки

    useEffect(() => {
        dispatch(fetchDepartments()); // Запускаем загрузку данных об отделах при монтировании компонента
    }, [dispatch]);

    if (loading) { // Если данные загружаются, показываем сообщение о загрузке
        return <Typography>Loading...</Typography>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Наши отделы
            </Typography>
            <Grid container spacing={3}>
                {departments.map(department => ( // Отображаем каждый отдел
                    <Grid item key={department._id} xs={12} sm={6} md={4}>
                        <Card>
                            {/* Здесь могут быть изображение, информация о отделе и т.д. */}
                            <CardContent>
                                <Typography variant="h5">{department.name}</Typography>
                                <Typography variant="body1">{department.description}</Typography>
                                {/* Пример: Здесь может быть другая информация о отделе */}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default DepartmentPage;
