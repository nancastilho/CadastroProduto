import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import correto do BrowserRouter
import Login from "./views/login/Login";
import CadastroUser from "./views/cadastroUser/CadastroUser";
import Home from "./views/home/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastroUser" element={<CadastroUser />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
