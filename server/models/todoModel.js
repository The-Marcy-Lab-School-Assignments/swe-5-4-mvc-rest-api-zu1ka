// A helper for generating unique IDs
let id = 1;
const getId = () => id++;

// Private in-memory array — not exported directly
const todos = [
    { id: getId(), task: 'Buy groceries', isDone: false },
    { id: getId(), task: 'Walk the dog', isDone: true },
    { id: getId(), task: 'Read a book', isDone: false },
];

// Returns a copy of all todos
module.exports.list = () => {
    return todos.map((todo) => ({ ...todo }));
};

// Returns a copy of the matching todo, or null
module.exports.find = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    return todo ? { ...todo } : null;
};

// Creates a new todo and returns it
module.exports.create = (task) => {
    const newTodo = { id: getId(), task, isDone: false };
    todos.push(newTodo);
    return newTodo;
};

// Updates a todo and returns it, or null if not found
module.exports.update = (id, changes) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return null;
    Object.assign(todo, changes);
    return { ...todo };
};

// Removes a todo, returns true if deleted or false if not found
module.exports.destroy = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return false;
    todos.splice(index, 1);
    return true;
};