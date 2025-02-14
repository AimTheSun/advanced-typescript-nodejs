"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContact = exports.getContactWithID = exports.getContacts = exports.addNewContact = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const crmModel_1 = require("../models/crmModel");
const Contact = mongoose_1.default.model('Contact', crmModel_1.ContactSchema);
const addNewContact = async (req, res) => {
    let newContact = new Contact(req.body);
    try {
        let contact = await newContact.save();
        res.status(201).json(contact);
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.addNewContact = addNewContact;
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(201).json(contacts);
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.getContacts = getContacts;
const getContactWithID = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.contactId);
        if (!contact) {
            res.status(404).json({ message: 'Contact not found' });
        }
        res.status(201).json(contact);
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.getContactWithID = getContactWithID;
const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true });
        if (!contact) {
            res.status(404).json({ message: 'Contact not found' });
            return;
        }
        res.status(200).json(contact);
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.updateContact = updateContact;
const deleteContact = async (req, res) => {
    try {
        const result = await Contact.deleteOne({ _id: req.params.contactId });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Contact not found' });
            return;
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.deleteContact = deleteContact;
