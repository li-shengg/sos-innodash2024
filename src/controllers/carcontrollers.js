// controller.js
const { findAllCars } = require('../models/carmodels');

async function getCars(req, res) {
    try {
        const cars = await findAllCars();
        res.status(200).json(cars);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

module.exports = {
    getCars
};
