import models from '../Models/models.js'
const HazardousJobModel = models.HazardousJobModel;

export const create = async (req, res) => {
    try {
        const { jobTitle, description } = req.body;
        const hazardousJob = await HazardousJobModel.create({ jobTitle, description });
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
        const hazardousJob = await HazardousJobModel.findByPk(hazardousJobId);
        
        if (!hazardousJob) {
            return res.status(404).json({
                message: 'Hazardous job not found',
            });
        }
        
        await hazardousJob.destroy();
        res.json({
            success: true,
            message: 'Hazardous job deleted successfully',
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
        let hazardousJob = await HazardousJobModel.findByPk(hazardousJobId);

        if (!hazardousJob) {
            return res.status(404).json({
                message: 'Hazardous job not found',
            });
        }

        hazardousJob.jobTitle = jobTitle;
        hazardousJob.description = description;
        await hazardousJob.save();

        res.json(hazardousJob);
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
        const hazardousJob = await HazardousJobModel.findByPk(hazardousJobId);

        if (!hazardousJob) {
            return res.status(404).json({
                message: 'Hazardous job not found',
            });
        }

        res.json(hazardousJob);
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
