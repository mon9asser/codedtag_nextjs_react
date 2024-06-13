const express = require('express');
const { Contact } = require('./../models/contact-model');
var contactRouter = express.Router();

// Create or Update Contact
contactRouter.post('/contact/create-update', async (req, res) => {
    try {
        const body = req.body;

        if (!body || Object.keys(body).length === 0) {
            throw new Error('Invalid request body');
        }

        let savedContact;
        if (body.contact_id !== undefined && body.contact_id !== "") {
            // Update the existing contact data
            savedContact = await Contact.findByIdAndUpdate(body.contact_id, body, { new: true });
        } else {
            // Save a new contact
            savedContact = await new Contact(body).save();
        }

        if (savedContact) {
            res.status(200).send({
                is_error: false,
                data: savedContact,
                message: 'Contact saved successfully'
            });
        } else {
            throw new Error('An error occurred, please try later');
        }

    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || 'An error occurred while creating the contact'
        });
    }
});

// Get Contacts with Pagination
contactRouter.get('/contacts', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { date: -1 }
        };
        console.log(page);
        const contacts = await Contact.paginate({}, options);
        
        res.status(200).send({
            is_error: false,
            data: {
                contacts: contacts.docs,
                currentPage: contacts.page,
                totalPages: contacts.totalPages
            },
            message: 'Contacts fetched successfully'
        });
    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || 'An error occurred while fetching contacts'
        });
    }
});

// Delete Contact
contactRouter.delete('/contacts', async (req, res) => {
    try {
        const { contact_id } = req.body;
        if (!contact_id) throw new Error('Contact ID is required');

        await Contact.findByIdAndDelete(contact_id);
        res.status(200).send({
            is_error: false,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || 'An error occurred while deleting the contact'
        });
    }
});

module.exports = { contactRouter };