import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { ContactSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = async (req: Request, res: Response): Promise <void> => {
    let newContact = new Contact(req.body);

    try {
        let contact = await newContact.save();
        res.status(201).json(contact);
        } catch (err) {
            res.status(500).send(err)
    }
};

export const getContacts = async (req: Request, res: Response): Promise <void> => {
       
       try {
        const contacts = await Contact.find();
        res.status(201).json(contacts);
       } catch (err) {
        res.status(500).send(err);
       }
      
    };

export const getContactWithID = async (req: Request, res: Response): Promise <void> => {
    try {
        const contact = await Contact.findById(req.params.contactId);
        if (!contact) {
            res.status(404).json({ message: 'Contact not found' });
        }
        res.status(201).json(contact);
        } catch (err) {
            res.status(500).send(err);
            }
    };

export const updateContact = async (req: Request, res: Response): Promise <void> => {

    try {
        const contact = await Contact.findOneAndUpdate( {_id: req.params.contactId}, req.body, { new: true });
        if (!contact) {
            res.status(404).json({ message: 'Contact not found' });
            return;
        }
        res.status(200).json(contact);
        } catch (err) {
            res.status(500).send(err);
            }
    };

export const deleteContact = async (req: Request, res: Response): Promise <void> => {

try {
    const result = await Contact.deleteOne({ _id: req.params.contactId });
   if (result.deletedCount === 0) {
    res.status(404).json({ message: 'Contact not found' });
    return;
}
    res.status(200).json({message: 'Contact deleted successfully'});
    } catch (err) {
        res.status(500).send(err);
        }
};