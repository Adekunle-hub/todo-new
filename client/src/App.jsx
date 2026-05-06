import React, { useEffect, useState } from "react";


const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input }),
      });

      if (!res.ok) throw new Error("Failed to add todo");

      const newTodo = await res.json();
      setTodos([newTodo, ...todos]);
      setInput("");
    } catch (err) {
      console.error("Error adding todo:", err);
      alert("Failed to add todo");
    }
  };

  const toggleTodo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });

      if (!res.ok) throw new Error("Failed to update");

      const updatedTodo = await res.json();

      setTodos(todos.map((todo) =>
        todo._id === id ? updatedTodo : todo
      ));
    } catch (err) {
      console.error("Error updating todo:", err);
      alert("Failed to update todo");
    }
  };

  const deleteTodo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Failed to delete");

      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
      alert("Failed to delete todo");
    }
  };

  return (
    <div className="app">
      <h1>ToDo App</h1>

      <section className="add-todo">
        <input
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Add ToDo</button>
      </section>

      <section className="todo-list">
        {loading && <p className="loading">Loading...</p>}

        {todos.length === 0 ? (
          <p className="no-todos">No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <div key={todo._id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo._id)}
              />

              <span className={`todo-text ${todo.completed ? "completed" : ""}`}>
                {todo.title}
              </span>

              <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default App;