import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '../redux/slices/department';
import { Grid, Card, CardContent, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const DepartmentPage = () => {
    const dispatch = useDispatch();
    const departments = useSelector(state => state.departments.departments);
    const loading = useSelector(state => state.departments.status) === 'loading';

    useEffect(() => {
        dispatch(fetchDepartments());
    }, [dispatch]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Наши отделы
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Название отдела</TableCell>
              
                    </TableRow>
                </TableHead>
                <TableBody>
                    {departments.map(department => (
                        <TableRow key={department._id}>
                            <TableCell>{department._id}</TableCell>
                            <TableCell>{department.name}</TableCell>
                           
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default DepartmentPage;
