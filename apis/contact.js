const express = require('express');
const { Contact } = require('./../models/contact-model');
var contactRouter = express.Router();
const crypto = require('crypto');
const validator = require('validator');
const {middlewareTokens} = require("./secure/middlewares")

// Encryption setup
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function validateAndSanitize(data) {
    let sanitizedData = {};

    // Validate and sanitize name
    if (validator.isAlpha(data.name, 'en-US', { ignore: ' ' })) {
        sanitizedData.name = validator.trim(validator.escape(data.name));
    } else {
        throw new Error('Invalid name');
    }

    // Validate and sanitize email
    if (validator.isEmail(data.email)) {
        sanitizedData.email = validator.normalizeEmail(data.email);
    } else {
        throw new Error('Invalid email');
    }

    // Validate and sanitize subject
    if (validator.isLength(data.subject, { min: 1, max: 100 })) {
        sanitizedData.subject = validator.trim(validator.escape(data.subject));
    } else {
        throw new Error('Invalid subject');
    }

    // Validate and sanitize message
    if (validator.isLength(data.message, { min: 1, max: 500 })) {
        sanitizedData.message = validator.trim(validator.escape(data.message));
    } else {
        throw new Error('Invalid message');
    }

    // Encrypt the message
    const encryptedMessage = encrypt(sanitizedData.message);
    sanitizedData.message =sanitizedData.message // encryptedMessage.encryptedData;
    sanitizedData.iv = encryptedMessage.iv;

    return sanitizedData;
}



// Create or Update Contact
contactRouter.post('/contact-message',middlewareTokens, async (req, res) => {
    try {

        const body = req.body;

        if (!body || Object.keys(body).length === 0) {
            throw new Error('Invalid request body');
        }

        // Validate and sanitize the input data
        const secureData = validateAndSanitize(body);

        // Save the sanitized and encrypted data to MongoDB
        let savedContact = await new Contact(secureData).save();

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
contactRouter.get('/contacts',middlewareTokens, async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { date: -1 }
        }; 
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
contactRouter.delete('/contacts',middlewareTokens, async (req, res) => {
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