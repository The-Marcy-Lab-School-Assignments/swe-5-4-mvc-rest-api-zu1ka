const todoModel = require('../models/todoModel');

module.exports.listTodos = (req, res) => {
    res.status(200).json(todoModel.list());
};

module.exports.findTodo = (req, res) => {
    const id = Number(req.params.id);
    const todo = todoModel.find(id);
    if (!todo) {
        return res.status(404).json({ message: `Error: Not found /api/todos/${id}` });
    }
    res.status(200).json(todo);
};

module.exports.createTodo = (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ message: 'Task is required.' });
    }
    const newTodo = todoModel.create(task);
    res.status(201).json(newTodo);
};

module.exports.updateTodo = (req, res) => {
    const id = Number(req.params.id);
    const todo = todoModel.update(id, req.body);
    if (!todo) {
        return res.status(404).json({ message: `Error: Not found /api/todos/${id}` });
    }
    res.status(200).json(todo);
};

module.exports.deleteTodo = (req, res) => {
    const id = Number(req.params.id);
    const deleted = todoModel.destroy(id);
    if (!deleted) {
        return res.status(404).json({ message: `Error: Not found /api/todos/${id}` });
    }
    res.status(204).send();
};