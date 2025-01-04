import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Edit from "./pages/Edit/Edit";
import Register from "./pages/Register/Register";
import Headers from "./components/Headers/Headers";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Headers />
        <Routes>
          <Route path="/"element={<Home/>}/>
          <Route path="/register"element={ <Register/>}/>
          <Route path="/edit/:id"element={<Edit/>}/>
          <Route path="/userprofile/:id"element={<Profile/>}/>
        </Routes>
    </>
  );
}

export default App;
