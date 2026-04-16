import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { STATUS } from "../../utils/constants";
import TodoForm from "./TodoForm";
import TodoColumn from "./TodoColumn";
import SearchBar from "./SearchBar";
import { ListTodo, Loader, CheckCircle } from "lucide-react";

const TodoApp = () => {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));


  // Filter todos based on search
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Get todos by status
  const getTodosByStatus = (status) => {
    return filteredTodos.filter((todo) => todo.status === status);
  };

  // Create new todo
  const createTodo = (data) => {
    const newTodo = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: STATUS.TODO,
      createdAt: new Date().toISOString(),
      userEmail: loggedInUser.email,
    };
    setTodos([...todos, newTodo]);
    toast.success("Todo created successfully!");
  };

  // Update existing todo
  const updateTodo = (data) => {
    const updatedTodo = {
      ...editingTodo,
      title: data.title,
      description: data.description,
      priority: data.priority,
    };

    setTodos(
      todos.map((todo) => (todo.id === editingTodo.id ? updatedTodo : todo)),
    );
    setEditingTodo(null);
    toast.success("Todo updated successfully!");
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Todo deleted successfully!");
  };

  // Move todo to next status
  const moveTodo = (todo, newStatus) => {
    const updatedTodo = { ...todo, status: newStatus };
    setTodos(todos.map((t) => (t.id === todo.id ? updatedTodo : t)));
    toast.success(`Task moved to ${newStatus}!`);
  };

  // Check if move is allowed (no direct Todo -> Done)
  const canMove = (todo, newStatus) => {
    if (todo.status === STATUS.TODO && newStatus === STATUS.DONE) {
      toast.error("Direct movement from Todo to Done is NOT allowed!");
      return false;
    }
    return true;
  };

  // Handle move from Todo to Inprogress
  const moveTodoToInprogress = (todo) => {
    if (canMove(todo, STATUS.INPROGRESS)) {
      moveTodo(todo, STATUS.INPROGRESS);
    }
  };

  // Handle move from Inprogress to Done
  const moveInprogressToDone = (todo) => {
    moveTodo(todo, STATUS.DONE);
  };

  // Get edit/delete permissions based on status
  const getPermissions = (status) => {
    switch (status) {
      case STATUS.TODO:
        return { showEdit: true, showDelete: true };
      case STATUS.INPROGRESS:
        return { showEdit: true, showDelete: false };
      default:
        return { showEdit: false, showDelete: false };
    }
  };

  return (
    <div className="container mx-auto px-6 py-6">
      {editingTodo ? (
        <TodoForm
          onSubmit={updateTodo}
          initialData={editingTodo}
          onCancel={() => setEditingTodo(null)}
        />
      ) : (
        <TodoForm onSubmit={createTodo} />
      )}

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TodoColumn
          //   title="📋 Todo"
          title={
            <span className="flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-gray-600" />
              Todo
            </span>
          }
          todos={getTodosByStatus(STATUS.TODO)}
          count={getTodosByStatus(STATUS.TODO).length}
          onMove={moveTodoToInprogress}
          onEdit={setEditingTodo}
          onDelete={deleteTodo}
          moveButtonText="Inprogress"
          {...getPermissions(STATUS.TODO)}
          bgColor="bg-blue-50"
        />

        <TodoColumn
          //   title="⚙️ Inprogress"
          title={
            <span className="flex items-center gap-2">
              <Loader className="w-5 h-5 text-yellow-600 animate-spin" />
              Inprogress
            </span>
          }
          todos={getTodosByStatus(STATUS.INPROGRESS)}
          count={getTodosByStatus(STATUS.INPROGRESS).length}
          onMove={moveInprogressToDone}
          onEdit={setEditingTodo}
          onDelete={deleteTodo}
          moveButtonText="Done"
          {...getPermissions(STATUS.INPROGRESS)}
          bgColor="bg-yellow-50"
        />

        <TodoColumn
          //   title="✅ Done"
          title={
            <span className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Done
            </span>
          }
          todos={getTodosByStatus(STATUS.DONE)}
          count={getTodosByStatus(STATUS.DONE).length}
          onMove={null}
          onEdit={null}
          onDelete={null}
          moveButtonText=""
          showEdit={false}
          showDelete={false}
          bgColor="bg-green-50"
        />
      </div>
    </div>
  );
};

export default TodoApp;
