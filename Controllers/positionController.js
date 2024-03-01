import models from '../Models/models.js';
const PositionModel = models.PositionModel;

export const create = async (req, res) => {
    try {
        const doc = new PositionModel({
            title: req.body.title,
        });

        const position = await doc.save();

        res.json(position);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Create attempt failed',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const positionId = req.params.id;

        const doc = await PositionModel.findByIdAndDelete(positionId);

        if (!doc) {
            return res.status(404).json({
                message: 'Position doesn\'t exist',
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
        const positionId = req.params.id;

        await PositionModel.updateOne(
            {
                _id: positionId
            },
            {
                title: req.body.title,
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
        const positionId = req.params.id;

        const doc = await PositionModel.findById(positionId);

        if (doc) {
            res.json(doc);
        } else {
            res.status(404).json({ message: 'Position not found' });
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
        const positions = await PositionModel.find();

        res.json(positions);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve positions',
        });
    }
};
