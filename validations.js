import { body } from 'express-validator';

export const userValidation = [
    body('userName', 'Name is required').notEmpty(),
    body('phoneNumber', 'Invalid phone number format').notEmpty(),
    body('passwordHash', 'Password is required').notEmpty(),
    body('role', 'Invalid role').isIn(['user', 'admin']),
];

export const departmentValidation = [
    body('name', 'Department name is required').notEmpty(),
];

export const positionValidation = [
    body('title', 'Position title is required').notEmpty(),
];

export const hazardousJobValidation = [
    body('jobTitle', 'Job title is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
];

export const employeeAccessValidation = [
    body('name', 'Access name is required').notEmpty(),
    body('granted', 'Granted status must be a boolean').isBoolean(),
];
