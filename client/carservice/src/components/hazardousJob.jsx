import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHazardousJobs } from '../redux/slices/hazardousJob';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const HazardousJobsTable = () => {
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
                        <TableCell>Название</TableCell>
                        <TableCell>Описание</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {hazardousJobs?.map(job => (
                        <TableRow key={job._id}>
                            <TableCell>{job.jobTitle}</TableCell>
                            <TableCell>{job.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default HazardousJobsTable;
