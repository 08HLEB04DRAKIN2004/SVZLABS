import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments, createDepartment, updateDepartment, deleteDepartment } from '../redux/slices/department';
import { Grid, Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const DepartmentAdminPage = () => {
    const dispatch = useDispatch();
    const departments = useSelector(state => state.departments.departments);
    const status = useSelector(state => state.departments.status);
    const error = useSelector(state => state.departments.error);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [currentDepartment, setCurrentDepartment] = useState(null);
    const [newDepartment, setNewDepartment] = useState({ name: '' });

    useEffect(() => {
        dispatch(fetchDepartments());
    }, [dispatch]);

    const handleOpenEditDialog = (department) => {
        setCurrentDepartment(department);
        setOpenEditDialog(true);
    };

    const handleDelete = (_id) => {
        dispatch(deleteDepartment(_id));
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setCurrentDepartment(null);
    };

    const handleOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
        setNewDepartment({ name: '' });
    };

    const handleChange = (e, isCurrentDepartment = true) => {
        const department = isCurrentDepartment ? currentDepartment : newDepartment;
        const updatedDepartment = { ...department, [e.target.name]: e.target.value };
        if (isCurrentDepartment) {
            setCurrentDepartment(updatedDepartment);
        } else {
            setNewDepartment(updatedDepartment);
        }
    };

    const handleCreateOrUpdateDepartment = (isCreate) => {
        if (isCreate) {
            dispatch(createDepartment(newDepartment));
            handleCloseCreateDialog();
        } else {
            dispatch(updateDepartment({ id: currentDepartment._id, updatedData: currentDepartment }));
            handleCloseEditDialog();
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Управление департаментами</Typography>
            <Button color="primary" onClick={handleOpenCreateDialog}>Добавить департамент</Button>
            <Grid container spacing={3}>
                {status === 'loading' && <div>Loading...</div>}
                {status === 'failed' && <div>Error: {error}</div>}
                {status === 'succeeded' && departments.map(department => (
                    <Grid item key={department._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{department.name}</Typography>
                                <Button color="primary" onClick={() => handleOpenEditDialog(department)}>Изменить</Button>
                                <Button color="secondary" onClick={() => handleDelete(department._id)}>Удалить</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Dialog for Creating a New Department */}
            <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
                <DialogTitle>Добавить новый департамент</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Название"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newDepartment.name}
                        onChange={(e) => handleChange(e, false)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateDialog}>Отмена</Button>
                    <Button onClick={() => handleCreateOrUpdateDepartment(true)}>Создать</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Editing a Department */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Изменить департамент</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Название"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentDepartment?.name}
                        onChange={(e) => handleChange(e, true)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Отмена</Button>
                    <Button onClick={() => handleCreateOrUpdateDepartment(false)}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DepartmentAdminPage;
