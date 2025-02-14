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

export const getContactWithID = (req: Request, res: Response) => {~

    try {
        
    }

    Contact.findById(req.params.contactId, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
}

export const updateContact = (req: Request, res: Response) => {
    Contact.findOneAndUpdate({ _id: req.params.contactId}, req.body, { new: true }, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    })
}

export const deleteContact = (req: Request, res: Response) => {
    Contact.remove({ _id: req.params.contactId }, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted contact'});
    })
}