import { RouterProvider } from "react-router-dom";
import "./App.css";
import Router from "./Routes/Route";

function App() {
  return (
    <>
      <RouterProvider router={Router}></RouterProvider>
    </>
  );
}

export default App;
