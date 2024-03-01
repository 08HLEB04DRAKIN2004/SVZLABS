import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHazardousJobs } from '../redux/slices/hazardousJob';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const HazardousJobTable = () => {
    const dispatch = useDispatch();
    const hazardousJobs = useSelector(state => state.hazardousJobs.hazardousJobs);

    useEffect(() => {
        dispatch(fetchHazardousJobs());
    }, [dispatch]);

    return (
        <div>
            <h2>Список опасных работ</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Название работы</TableCell>
                        <TableCell>Описание</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {hazardousJobs.map(hazardousJob => (
                        <TableRow key={hazardousJob._id}>
                            <TableCell>{hazardousJob._id}</TableCell>
                            <TableCell>{hazardousJob.jobTitle}</TableCell>
                            <TableCell>{hazardousJob.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default HazardousJobTable;
