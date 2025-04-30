import React, { useState, useEffect } from "react";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  due_date?: string;
  priority: "low" | "medium" | "high";
  category?: string;
}

interface TodoListProps {
  token: string;
}

type SortOption = "due_date" | "priority" | "created_at";
type FilterOption = "all" | "active" | "completed";

export default function TodoList({ token }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    category: "",
    due_date: "",
    priority: "medium" as "low" | "medium" | "high",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("created_at");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/todos/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data);
    } catch (err) {
      setError("Failed to fetch todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const todoData = {
        ...newTodo,
        due_date: newTodo.due_date
          ? new Date(newTodo.due_date).toISOString()
          : null,
      };
      await axios.post("http://localhost:8000/todos/", todoData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewTodo({
        title: "",
        description: "",
        category: "",
        due_date: "",
        priority: "medium",
      });
      fetchTodos();
    } catch (err) {
      setError("Failed to create todo");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      await axios.put(
        `http://localhost:8000/todos/${todo.id}`,
        { completed: !todo.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTodos();
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-400";
    }
  };

  const filteredAndSortedTodos = todos
    .filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.category?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "active" && !todo.completed) ||
        (filterBy === "completed" && todo.completed);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "due_date":
          return (
            new Date(a.due_date || "").getTime() -
            new Date(b.due_date || "").getTime()
          );
        case "priority":
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        default:
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      }
    });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-[#111] rounded-lg border border-[#333] p-6">
        <h1 className="text-3xl font-bold mb-8 text-white">Todo List</h1>

        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 bg-[#222] border border-[#333] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="p-2 bg-[#222] border border-[#333] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="created_at">Sort by Date</option>
            <option value="due_date">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
          </select>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as FilterOption)}
            className="p-2 bg-[#222] border border-[#333] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newTodo.title}
              onChange={(e) =>
                setNewTodo({ ...newTodo, title: e.target.value })
              }
              className="flex-1 p-2 bg-[#222] border border-[#333] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={newTodo.category}
              onChange={(e) =>
                setNewTodo({ ...newTodo, category: e.target.value })
              }
              className="w-32 p-2 bg-[#222] border border-[#333] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Description"
              value={newTodo.description}
              onChange={(e) =>
                setNewTodo({ ...newTodo, description: e.target.value })
              }
              className="flex-1 p-2 bg-[#222] border border-[#333] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="datetime-local"
              value={newTodo.due_date}
              onChange={(e) =>
                setNewTodo({ ...newTodo, due_date: e.target.value })
              }
              className="w-48 p-2 bg-[#222] border border-[#333] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={newTodo.priority}
              onChange={(e) =>
                setNewTodo({
                  ...newTodo,
                  priority: e.target.value as "low" | "medium" | "high",
                })
              }
              className="w-32 p-2 bg-[#222] border border-[#333] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Adding..." : "Add Todo"}
            </button>
          </div>
        </form>

        {error && (
          <div className="text-red-500 mb-4 p-3 bg-red-500/10 rounded-md border border-red-500/20">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {filteredAndSortedTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-4 bg-[#222] rounded-md border border-[#333] hover:border-[#444] transition-colors"
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo)}
                  className="h-5 w-5 rounded border-[#333] text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-medium text-white ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.title}
                    </h3>
                    {todo.category && (
                      <span className="px-2 py-1 text-xs bg-[#333] text-gray-300 rounded-full">
                        {todo.category}
                      </span>
                    )}
                    <span
                      className={`text-sm ${getPriorityColor(todo.priority)}`}
                    >
                      {todo.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{todo.description}</p>
                  {todo.due_date && (
                    <p className="text-xs text-gray-500 mt-1">
                      Due: {new Date(todo.due_date).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
