import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeAccess } from '../redux/slices/employeeAccess';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const EmployeeAccessTable = () => {
    const dispatch = useDispatch();
    const employeeAccess = useSelector(state => state.employeeAccess.employeeAccess);

    useEffect(() => {
        dispatch(fetchEmployeeAccess());
    }, [dispatch]);

    return (
        <div>
            <h2>Доступ сотрудников к опасным работам</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Идентификатор</TableCell>
                        <TableCell>Имя</TableCell>
                        <TableCell>Статус доступа</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employeeAccess.map(access => (
                        <TableRow key={access._id}>
                            <TableCell>{access._id}</TableCell>
                            <TableCell>{access.name}</TableCell>
                            <TableCell>{access.granted ? 'Да' : 'Нет'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default EmployeeAccessTable;
