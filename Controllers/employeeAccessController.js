import models from '../Models/models.js'
const EmployeeAccessModel = models.EmployeeAccessModel;

export const create = async (req, res) => {
    try {
        const { name, granted } = req.body;
        const employeeAccess = await EmployeeAccessModel.create({ granted, name });
        res.json(employeeAccess);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Create attempt failed',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const accessId = req.params.id;

        const doc = await EmployeeAccessModel.findByIdAndDelete(accessId);

        if (!doc) {
            return res.status(404).json({
                message: 'Employee access record not found',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to remove employee access record',
        });
    }
};
export const update = async (req, res) => {
    try {
        const employeeAccessId = req.params.id;
        const { granted, name } = req.body;
        let employeeAccess = await EmployeeAccessModel.findById(employeeAccessId);

        if (!employeeAccess) {
            return res.status(404).json({
                message: 'Employee access not found',
            });
        }

        employeeAccess.granted = granted;
        await employeeAccess.save();

        res.json(employeeAccess);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Update attempt failed',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const employeeAccessId = req.params.id;
        const employeeAccess = await EmployeeAccessModel.findByPk(employeeAccessId);

        if (!employeeAccess) {
            return res.status(404).json({
                message: 'Employee access not found',
            });
        }

        res.json(employeeAccess);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Search attempt failed',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const employeeAccessList = await EmployeeAccessModel.find();
        res.json(employeeAccessList);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve employee accesses',
        });
    }
};
