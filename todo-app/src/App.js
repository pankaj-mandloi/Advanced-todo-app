import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import TodoApp from "./components/Todo/TodoApp";
import { FileText, User } from "lucide-react";
import { DoorOpen } from "lucide-react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    toast.success("Login successful! Welcome back! 🎉");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    localStorage.removeItem("loggedInUser");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              icon: "✅",
            },
            error: {
              duration: 4000,
              icon: "❌",
            },
          }}
        />
        {showLogin ? (
          <Login
            onLogin={handleLogin}
            onSwitchToSignup={() => setShowLogin(false)}
          />
        ) : (
          <Signup onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <div className="min-h-screen bg-gray-100">
        {/* Header with Logout button on same line */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <FileText className="w-7 h-7" />
                  Task Manager
                </h1>

                <p className="text-gray-600 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Welcome,{" "}
                  {JSON.parse(localStorage.getItem("loggedInUser"))?.name}!
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="border border-red-500 text-red-600 px-2 py-1 rounded-lg hover:bg-red-500 hover:text-white transition duration-200 flex items-center gap-2"
              >
                <DoorOpen className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
        <TodoApp />
      </div>
    </>
  );
}

export default App;
