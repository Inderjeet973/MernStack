// import { useState } from 'react'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
// import To_do from './To_do'
// import Todo_list from './Todo_list';

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       {/* <To_do/> */}
//       <BrowserRouter>
//       <Routes>
//         <Route path="/"element={<To_do/>}/>
//         <Route path='/view' element={<Todo_list/>}/>
//       </Routes>
//       </BrowserRouter>
//     </>
//   )
// }

// export default App
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import './App.css'
 import To_do from './To_do'
 import Todo_list from './Todo_list';
import Todo_List from "./Todo_list";
export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = sessionStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<To_do todos={todos} setTodos={setTodos} />}
        />

        <Route
          path="/list"
          element={<Todo_List todos={todos} setTodos={setTodos} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
