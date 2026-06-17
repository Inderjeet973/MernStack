

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import To_do from "./To_do";
import Todo_List from "./Todo_list";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<To_do />} />
        <Route path="/list" element={<Todo_List />} />
      </Routes>
    </BrowserRouter>
  );
}

