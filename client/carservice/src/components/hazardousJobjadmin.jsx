import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHazardousJobs, createHazardousJob, updateHazardousJob, deleteHazardousJob } from '../redux/slices/hazardousJob';
import { Grid, Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const HazardousJobAdmin = () => {
    const dispatch = useDispatch();
    const hazardousJobs = useSelector(state => state.hazardousJobs.hazardousJobs);
    const status = useSelector(state => state.hazardousJobs.status);
    const error = useSelector(state => state.hazardousJobs.error);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [currentHazardousJob, setCurrentHazardousJob] = useState(null);
    const [newHazardousJob, setNewHazardousJob] = useState({ jobTitle: '', description: '' });

    useEffect(() => {
        dispatch(fetchHazardousJobs());
    }, [dispatch]);

    const handleOpenEditDialog = (hazardousJob) => {
        setCurrentHazardousJob(hazardousJob);
        setOpenEditDialog(true);
    };

    const handleDelete = (_id) => {
        dispatch(deleteHazardousJob(_id));
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setCurrentHazardousJob(null);
    };

    const handleOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
        setNewHazardousJob({ jobTitle: '', description: '' });
    };

    const handleChange = (e, isCurrentHazardousJob = true) => {
        const hazardousJob = isCurrentHazardousJob ? currentHazardousJob : newHazardousJob;
        const updatedHazardousJob = { ...hazardousJob, [e.target.name]: e.target.value };
        if (isCurrentHazardousJob) {
            setCurrentHazardousJob(updatedHazardousJob);
        } else {
            setNewHazardousJob(updatedHazardousJob);
        }
    };

    const handleCreateOrUpdateHazardousJob = (isCreate) => {
        if (isCreate) {
            dispatch(createHazardousJob(newHazardousJob));
            handleCloseCreateDialog();
        } else {
            dispatch(updateHazardousJob({ id: currentHazardousJob._id, updatedData: currentHazardousJob }));
            handleCloseEditDialog();
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Управление опасными работами</Typography>
            <Button color="primary" onClick={handleOpenCreateDialog}>Добавить опасную работу</Button>
            <Grid container spacing={3}>
                {status === 'loading' && <div>Loading...</div>}
                {status === 'failed' && <div>Error: {error}</div>}
                {status === 'succeeded' && hazardousJobs.map(hazardousJob => (
                    <Grid item key={hazardousJob._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{hazardousJob.jobTitle}</Typography>
                                <Typography variant="body2">{hazardousJob.description}</Typography>
                                <Button color="primary" onClick={() => handleOpenEditDialog(hazardousJob)}>Изменить</Button>
                                <Button color="secondary" onClick={() => handleDelete(hazardousJob._id)}>Удалить</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Dialog for Creating a New Hazardous Job */}
            <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
                <DialogTitle>Добавить новую опасную работу</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="jobTitle"
                        label="Название работы"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newHazardousJob.jobTitle}
                        onChange={(e) => handleChange(e, false)}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Описание"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newHazardousJob.description}
                        onChange={(e) => handleChange(e, false)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateDialog}>Отмена</Button>
                    <Button onClick={() => handleCreateOrUpdateHazardousJob(true)}>Создать</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Editing a Hazardous Job */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Изменить опасную работу</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="jobTitle"
                        label="Название работы"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentHazardousJob?.jobTitle}
                        onChange={(e) => handleChange(e, true)}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Описание"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentHazardousJob?.description}
                        onChange={(e) => handleChange(e, true)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Отмена</Button>
                    <Button onClick={() => handleCreateOrUpdateHazardousJob(false)}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default HazardousJobAdmin;
