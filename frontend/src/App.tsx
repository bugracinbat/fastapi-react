import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TodoList from "./components/TodoList";

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  if (!token) {
    return showSignup ? (
      <Signup
        onSignupSuccess={() => setShowSignup(false)}
        onLogin={handleLogin}
      />
    ) : (
      <Login onShowSignup={() => setShowSignup(true)} onLogin={handleLogin} />
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-[#111] border-b border-[#333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Todo App</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-[#333] rounded-md hover:bg-[#444] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <TodoList token={token} />
      </main>
    </div>
  );
}

export default App;
