import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/login/Login";
import CadastroUser from "./views/cadastroUser/CadastroUser";
import Home from "./views/home/Home";
import { Toaster } from "react-hot-toast";
import ViewUsers from "./views/cadastroUser/ViewUser";

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastroUser" element={<CadastroUser />} />
        <Route path="/usuarios" element={<ViewUsers />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
