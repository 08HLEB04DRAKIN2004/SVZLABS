import models from '../Models/models.js';
const HazardousJobModel = models.HazardousJobModel;

export const create = async (req, res) => {
    try {
        const { jobTitle, description } = req.body;
        const doc = new HazardousJobModel({ jobTitle, description });
        const hazardousJob = await doc.save();
        res.json(hazardousJob);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Create attempt failed',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const hazardousJobId = req.params.id;
        const doc = await HazardousJobModel.findByIdAndDelete(hazardousJobId);
        if (!doc) {
            return res.status(404).json({
                message: 'Hazardous job does not exist',
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
        const hazardousJobId = req.params.id;
        const { jobTitle, description } = req.body;
        await HazardousJobModel.findByIdAndUpdate(hazardousJobId, { jobTitle, description });
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
        const hazardousJobId = req.params.id;
        const doc = await HazardousJobModel.findById(hazardousJobId);
        if (doc) {
            res.json(doc);
        } else {
            res.status(404).json({ message: 'Hazardous job not found' });
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
        const hazardousJobs = await HazardousJobModel.find();
        res.json(hazardousJobs);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve hazardous jobs',
        });
    }
};
