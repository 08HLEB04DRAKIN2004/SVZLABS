import models from '../Models/models.js'
const DepartmentModel = models.DepartmentModel;
export const create = async (req, res) => {
    try {
        const doc = new DepartmentModel({
            name: req.body.name,
        });

        const department = await doc.save();

        res.json(department);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Create attempt failed',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const departmentId = req.params.id;

        const doc = await DepartmentModel.findByIdAndDelete(departmentId);

        if (!doc) {
            return res.status(404).json({
                message: 'Department doesn\'t exist',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Remove attempt failed',
        });
    }
};

export const update = async (req, res) => {
    try {
        const departmentId = req.params.id;

        await DepartmentModel.updateOne(
            {
                _id: departmentId
            },
            {
                name: req.body.name,
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Update attempt failed',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const departmentId = req.params.id;

        const doc = await DepartmentModel.findById(departmentId);

        if (doc) {
            res.json(doc);
        } else {
            res.status(404).json({ message: 'Department not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Search attempt failed',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const departments = await DepartmentModel.find();

        res.json(departments);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve departments',
        });
    }
};
