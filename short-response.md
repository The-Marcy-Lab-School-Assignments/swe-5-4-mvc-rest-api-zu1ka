# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

**Your answer here**:

---

The Todo Tracker API follows REST principles in several ways. First, it uses resource-based URLs, such as /todos and /todos/:id, which clearly represent collections and individual items. This communicates to the client what type of data they are accessing. Second, it uses HTTP methods appropriately: GET to retrieve todos, POST to create a new todo, PUT or PATCH to update a todo, and DELETE to remove a todo. This tells the client what action will be performed on the resource. Third, it returns standard HTTP status codes, like 200 OK for successful requests, 201 Created when a new todo is added, and 404 Not Found when a requested todo doesn’t exist. This gives the client clear feedback on the result of their request.

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

**Your answer here**:

---

Mixing data logic and request/response logic in a single file creates tight coupling, which makes the code harder to maintain and scale. As the application grows, the file becomes cluttered with database queries, business logic, and HTTP handling all in one place, making it difficult to debug or modify without accidentally breaking something. It also makes testing harder, since you can’t easily isolate and test the data logic separately from the request handling.
Separating the code into a model and a controller improves organization and clarity. The model handles all data-related operations (like reading or updating todos), while the controller manages HTTP requests and responses. This separation makes the code easier to test, reuse, and extend, because each part has a single responsibility. It also allows developers to update the data layer or API behavior independently without affecting the other.

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

**Your answer here**:

---

When the user clicks the checkbox, the event is first handled in the frontend JavaScript file (for example, main.js) by an event listener function like handleToggleTodo. This function captures the todo’s id and sends a PATCH request to the endpoint /todos/:id, including the updated isDone value in the request body. This step initiates the request from the client to the server.

Next, the request reaches the server in index.js, where Express routes it to the appropriate controller function, such as updateTodo in controllers/todoController.js. The controller function reads the id from req.params and the new isDone value from req.body, then calls a model function like updateTodoById in models/todoModel.js. This keeps the controller focused only on handling the request and delegating data operations.

Finally, the model function updates the todo data (for example, in an array or database) and returns the updated todo back to the controller. The controller then sends a response, typically with a 200 OK status and the updated todo in JSON format. Once the frontend receives this response, it updates the UI to reflect the new isDone state of the checkbox.

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task)
    return res.status(400).send({ message: "task is required" });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

**Your answer here**:

1.  const { task } = req.body;
    This belongs in the controller because it is extracting data from the HTTP request (req). The controller’s responsibility is to handle incoming requests and pull out relevant inputs before passing them to the model.

2.  if (!task) return res.status(400).send({ message: "task is required" });
    This is request validation and response handling, which are controller responsibilities. It ensures the client sent valid data and sends an appropriate HTTP status code (400 Bad Request) if not.

3.  const newTodo = { id: getId(), task, isDone: false };
    This belongs in the model because it defines how a todo is structured and created. Generating IDs and shaping data are part of business/data logic, not HTTP handling.

4.  todos.push(newTodo);
    This is clearly data manipulation (writing to storage), which is the model’s responsibility. The model should handle how and where data is stored.

5.  res.status(201).send(newTodo);
    This belongs in the controller because it sends the HTTP response back to the client. The controller decides the status code (201 Created) and what data to return after the model completes its work.
