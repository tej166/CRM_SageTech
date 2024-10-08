// Routes/ToDoRouter.js
const express = require('express');
const router = express.Router();
const ToDo = require('../Models/ToDo');

router.post('/', async (req, res) => {
  try {
    const toDo = new ToDo(req.body);
    await toDo.save();
    res.status(201).json({ message: 'ToDo item created successfully', success: true });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
});

router.get('/', async (req, res) => {
  try {
    const criteria = req.query;
    const toDos = await ToDo.find(criteria);
    res.status(200).json(toDos);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
});

module.exports = router;
