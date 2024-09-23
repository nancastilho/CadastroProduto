import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false); // Estado para controlar o menu
  const userName =
    JSON.parse(localStorage.getItem("user") || "{}").nomeUsuario || "Usuário";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  const handleNavigateUser = () => {
    navigate("/usuarios");
  };

  const handleOpenMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full h-16 border-b flex justify-between items-center px-4 text-gray-950">
      <div className="flex items-center space-x-4">
        <Icon icon={"icon-park-outline:hamburger-button"} />

        <div className="flex items-center cursor-pointer" onClick={() => navigate("/home")}>
          <img
            src="SistemaGerencialTXAIBlack.svg"
            alt="TXAI Logo"
            className="h-10 mr-2"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6 ">
        <div className="flex items-center space-x-1">
          <Icon icon={"material-symbols:help-outline"} fontSize={20} />
          <span>Suporte</span>
        </div>

        <div className="flex items-center space-x-1">
          <Icon icon={"heroicons:calendar-days"} fontSize={20} />
          <span>Acessar Calendário</span>
        </div>

        <div className="relative">
          <Icon icon={"heroicons:bell"} fontSize={20} />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        <button
          className="flex items-center space-x-1"
          onClick={handleOpenMenu}
        >
          <Icon icon={"heroicons:user-circle"} fontSize={20} />
          <span>{userName}</span>
          <span className="text-xs">&#9662;</span>{" "}
        </button>

        {isMenuOpen && (
          <div className="absolute right-4 top-16 bg-white border rounded shadow-lg w-56 py-2">
            <button
              onClick={handleNavigateUser}
              className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
              <Icon icon={"heroicons:user-group-20-solid"} className="mr-2" />
              Cadastro de usuários
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center  w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
              <Icon icon={"heroicons-outline:logout"} className="mr-2" />
              Sair
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
