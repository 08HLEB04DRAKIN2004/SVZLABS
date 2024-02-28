import models from '../Models/models.js'
const PositionModel = models.PositionModel;

export const create = async (req, res) => {
    try {
        const { title } = req.body;
        const position = await PositionModel.create({ title });
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
        const position = await PositionModel.findByPk(positionId);
        
        if (!position) {
            return res.status(404).json({
                message: 'Position not found',
            });
        }
        
        await position.destroy();
        res.json({
            success: true,
            message: 'Position deleted successfully',
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
        const { title } = req.body;
        let position = await PositionModel.findByPk(positionId);

        if (!position) {
            return res.status(404).json({
                message: 'Position not found',
            });
        }

        position.title = title;
        await position.save();

        res.json(position);
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
        const position = await PositionModel.findByPk(positionId);

        if (!position) {
            return res.status(404).json({
                message: 'Position not found',
            });
        }

        res.json(position);
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
