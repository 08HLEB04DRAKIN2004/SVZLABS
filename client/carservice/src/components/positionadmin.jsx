import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPositions, createPosition, updatePosition, deletePosition } from '../redux/slices/position';
import { Grid, Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const PositionAdminPage = () => {
    const dispatch = useDispatch();
    const positions = useSelector(state => state.positions.positions);
    const status = useSelector(state => state.positions.status);
    const error = useSelector(state => state.positions.error);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [newPosition, setNewPosition] = useState({ title: '' });

    useEffect(() => {
        dispatch(fetchPositions());
    }, [dispatch]);

    const handleOpenEditDialog = (position) => {
        setCurrentPosition(position);
        setOpenEditDialog(true);
    };

    const handleDelete = (id) => {
        dispatch(deletePosition(id));
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setCurrentPosition(null);
    };

    const handleOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
        setNewPosition({ title: '' });
    };

    const handleChange = (e, isCurrentPosition = true) => {
        const position = isCurrentPosition ? currentPosition : newPosition;
        const updatedPosition = { ...position, [e.target.name]: e.target.value };
        if (isCurrentPosition) {
            setCurrentPosition(updatedPosition);
        } else {
            setNewPosition(updatedPosition);
        }
    };

    const handleCreateOrUpdatePosition = (isCreate) => {
        if (isCreate) {
            dispatch(createPosition(newPosition));
            handleCloseCreateDialog();
        } else {
            dispatch(updatePosition({ id: currentPosition._id, updatedData: currentPosition }));
            handleCloseEditDialog();
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Управление позициями</Typography>
            <Button color="primary" onClick={handleOpenCreateDialog}>Добавить позицию</Button>
            <Grid container spacing={3}>
                {status === 'loading' && <div>Loading...</div>}
                {status === 'failed' && <div>Error: {error}</div>}
                {status === 'succeeded' && positions.map(position => (
                    <Grid item key={position._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{position.title}</Typography>
                                <Button color="primary" onClick={() => handleOpenEditDialog(position)}>Изменить</Button>
                                <Button color="secondary" onClick={() => handleDelete(position._id)}>Удалить</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Dialog for Creating a New Position */}
            <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
                <DialogTitle>Добавить новую позицию</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Название"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newPosition.title}
                        onChange={(e) => handleChange(e, false)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateDialog}>Отмена</Button>
                    <Button onClick={() => handleCreateOrUpdatePosition(true)}>Создать</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Editing a Position */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Изменить позицию</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Название"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentPosition?.title}
                        onChange={(e) => handleChange(e, true)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Отмена</Button>
                    <Button onClick={() => handleCreateOrUpdatePosition(false)}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PositionAdminPage;
