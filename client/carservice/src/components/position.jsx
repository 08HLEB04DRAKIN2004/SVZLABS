import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPositions } from '../redux/slices/position';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const PositionTable = () => {
    const dispatch = useDispatch();
    const positions = useSelector(state => state.positions.positions);

    useEffect(() => {
        dispatch(fetchPositions());
    }, [dispatch]);

    return (
        <div>
            <h2>Список должностей</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Название должности</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {positions.map(position => (
                        <TableRow key={position._id}>
                            <TableCell>{position._id}</TableCell>
                            <TableCell>{position.title}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PositionTable;
