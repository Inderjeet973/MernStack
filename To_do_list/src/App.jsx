

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";

// import To_do from "./pages/To_do";
// import Todo_List from "./pages/Todo_list";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<To_do />} />
//         <Route path="/list" element={<Todo_List />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import To_do from "../src/pages/To_do";
import Todo_List from "../src/pages/Todo_list";
import PrivateRoute from "./components/PrivateRoute";
import Update from "./components/Update";
import PublicRoute from "./components/PublicRoute";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route path="/register" element={

          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="/update" element={<Update />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <To_do />
            </PrivateRoute>
          }
        />

        <Route
          path="/list"
          element={
            <PrivateRoute>
              <Todo_List />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}