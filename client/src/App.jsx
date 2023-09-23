import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Connection from "./components/layout/Connection";
import Website from "./components/layout/Website";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Connection />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/website" element={<Website />}>
            <Route path="/website" element={<Home />} />
            <Route path="/website/profile" element={<Profile />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
