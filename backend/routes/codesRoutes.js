import express from 'express';
import { Code } from '../models/CodeModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.uploadTime || !req.body.description) {
            return res.status(500).send(
                {
                    message: "Enter all required field.",
                }
            );
        }
        if (!req.body.author) {
            req.body.author = "Anonymous Coder"
        }
        if (!req.body.description) {
            req.body.description= "NULL"
        }
        const newCode = {
            title: req.body.title,
            author: req.body.author,
            uploadTime: req.body.uploadTime,
            description: req.body.description
        };

        const oneCode = await Code.create(newCode);
        return res.status(201).send(oneCode);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const codes = await Code.find({});

        return res.status(200).json(
            {
                count: codes.length,
                data: codes,
            }
        );

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const code = await Code.findById(id);
        if (!code) {
            return res.status(404).json({ message: `Can't find the code` });
        }
        return res.status(200).json(code);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.uploadTime || !req.body.description) {
            return res.status(500).send(
                {
                    message: "Enter all required field.",
                }
            );
        }
        if (!req.body.author) {
            req.body.author = "Anonymous Coder"
        }
        if (!req.body.description) {
            req.body.description = "NULL"
        }
        const { id } = req.params;
        const result = await Code.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(500).json({ message: 'Code was not found' });
        }
        return res.status(200).json({ message: 'Code was updates successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Code.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Code was not found' });
        }
        return res.status(200).send({ message: 'Code deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;