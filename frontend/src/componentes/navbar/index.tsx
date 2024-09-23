import { Icon } from "@iconify/react/dist/iconify.js";

function Navbar() {
  const userName =
    JSON.parse(localStorage.getItem("user") || "{}").nomeUsuario || "Usuário";

  return (
    <div className="w-full h-16 border-b flex justify-between items-center px-4 text-gray-950">
      <div className="flex items-center space-x-4">
        <Icon icon={"icon-park-outline:hamburger-button"} />

        <div className="flex items-center">
          <img
            src="SistemaGerencialTXAIBlack.svg"
            alt="TXAI Logo"
            className="h-10 mr-2"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6 ">
        <div className="flex items-center space-x-1">
          <Icon icon={"material-symbols:help-outline"} />
          <span>Suporte</span>
        </div>

        <div className="flex items-center space-x-1">
          <Icon icon={"heroicons:calendar-days"} />
          <span>Acessar Calendário</span>
        </div>

        <div className="relative">
          <Icon icon={"heroicons:bell"} />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        <div className="flex items-center space-x-1">
          <Icon icon={"heroicons:user-circle"} />
          <span>{userName}</span>
          <span className="text-xs">&#9662;</span>{" "}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
