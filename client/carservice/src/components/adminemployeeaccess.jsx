import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeAccess, createEmployeeAccess, updateEmployeeAccess, deleteEmployeeAccess } from '../redux/slices/employeeAccess';
import { Grid, Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const EmployeeAccessAdminPage = () => {
    const dispatch = useDispatch();
    const employeeAccess = useSelector(state => state.employeeAccess.employeeAccess);
    const status = useSelector(state => state.employeeAccess.status);
    const error = useSelector(state => state.employeeAccess.error);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [currentAccess, setCurrentAccess] = useState(null);
    const [newAccess, setNewAccess] = useState({ name: '', granted: false });

    useEffect(() => {
        dispatch(fetchEmployeeAccess());
    }, [dispatch]);

    const handleOpenEditDialog = (access) => {
        setCurrentAccess(access);
        setOpenEditDialog(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteEmployeeAccess(id));
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setCurrentAccess(null);
    };

    const handleOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
        setNewAccess({ name: '', granted: false });
    };

    const handleChange = (e, isCurrentAccess = true) => {
        const access = isCurrentAccess ? currentAccess : newAccess;
        const updatedAccess = { ...access, [e.target.name]: e.target.value };
        if (isCurrentAccess) {
            setCurrentAccess(updatedAccess);
        } else {
            setNewAccess(updatedAccess);
        }
    };

    const handleCreateOrUpdateAccess = (isCreate) => {
        if (isCreate) {
            dispatch(createEmployeeAccess(newAccess));
            handleCloseCreateDialog();
        } else {
            dispatch(updateEmployeeAccess({ id: currentAccess._id, updatedData: currentAccess }));
            handleCloseEditDialog();
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Управление доступом к сотрудникам</Typography>
            <Button color="primary" onClick={handleOpenCreateDialog}>Добавить доступ</Button>
            <Grid container spacing={3}>
                {status === 'loading' && <div>Loading...</div>}
                {status === 'failed' && <div>Error: {error}</div>}
                {status === 'succeeded' && employeeAccess.map(access => (
                    <Grid item key={access._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{access.name}</Typography>
                                <Typography variant="body2">Доступ: {access.granted ? 'разрешен' : 'запрещен'}</Typography>
                                <Button color="primary" onClick={() => handleOpenEditDialog(access)}>Изменить</Button>
                                <Button color="secondary" onClick={() => handleDelete(access._id)}>Удалить</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Dialog for Creating a New Access */}
            <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
                <DialogTitle>Добавить новый доступ</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Название"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newAccess.name}
                        onChange={(e) => handleChange(e, false)}
                    />
                    <TextField
                        margin="dense"
                        name="granted"
                        label="Доступ (true/false)"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newAccess.granted}
                        onChange={(e) => handleChange(e, false)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateDialog}>Отмена</Button>
                    <Button onClick={() => handleCreateOrUpdateAccess(true)}>Создать</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Editing an Access */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Изменить доступ</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Название"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentAccess?.name}
                        onChange={(e) => handleChange(e, true)}
                    />
                    <TextField
                        margin="dense"
                        name="granted"
                        label="Доступ (true/false)"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentAccess?.granted}
                        onChange={(e) => handleChange(e, true)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Отмена</Button>
                    <Button onClick={() => handleCreateOrUpdateAccess(false)}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EmployeeAccessAdminPage;
