const express = require('express');
const { Menus } = require('./../models/menus-model');
const {middlewareTokens} = require("./secure/middlewares")
var menuRouter = express.Router();

menuRouter.post('/menu/create-update', middlewareTokens, async (req, res) => {
    try {
        const { menus, deletedIds } = req.body;

        // Validation or additional logic can be added here
        if (!menus || !Array.isArray(menus) || menus.length === 0) {
            throw new Error('Invalid request body');
        }

        let operations = menus.map(menu => {
            if (menu._id) {
                // Update existing menu
                return {
                    updateOne: {
                        filter: { _id: menu._id },
                        update: { $set: menu },
                        upsert: true
                    }
                };
            } else {
                // Insert new menu
                return {
                    insertOne: {
                        document: menu
                    }
                };
            }
        });

        // Execute bulk operations for insert and update
        const result = await Menus.bulkWrite(operations);

        // Delete menus with IDs in deletedIds
        if (deletedIds && deletedIds.length > 0) {
            await Menus.deleteMany({ _id: { $in: deletedIds } });
        }

        res.status(200).send({
            is_error: false,
            data: result,
            message: 'Menus saved successfully',
        });

    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || 'An error occurred while saving the menus',
        });
    }
});


menuRouter.get('/menus', middlewareTokens, async (req, res) => {
     
    try {
        const { menu_id } = req.query;

        if (menu_id) {
            // Fetch the specific menu by ID
            const menu = await Menus.findById(menu_id);
            if (menu) {
                res.status(200).send({
                    is_error: false,
                    data: menu,
                    message: 'Menu fetched successfully',
                });
            } else {
                throw new Error('Menu not found');
            }
        } else {
            // Fetch all menus
            const menus = await Menus.find({});
            res.status(200).send({
                is_error: false,
                data: menus,
                message: 'All menus fetched successfully',
            });
        }
    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || 'An error occurred while fetching menus',
        });
    }
});

module.exports = { menuRouter };