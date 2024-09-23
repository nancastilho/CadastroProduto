import { useEffect, useState } from "react";
import Navbar from "../../componentes/navbar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IUser } from "../../interface";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userService } from "../../service/user";
import ConfirmDeleteModal from "../../componentes/confirmaDelete/delete";
import UserModal from "./formUser/form";

const ViewUsers = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectItem, setSelectItem] = useState<IUser>();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [data, setData] = useState<IUser[]>([]);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
  const [idDelete, setIdDelete] = useState(0);

  const { admin } =
    JSON.parse(localStorage.getItem("user") || "{}") || ({} as IUser);

  const handleDelete = (id: number) => {
    userService
      .deleteUsuario(id)
      .then(() => {
        toast.success("Usuário deletado com sucesso!", { duration: 2000 });
        handleModalCloseDelete();
      })
      .catch(() => {
        toast.error("Erro ao deletar Usuário!", { duration: 2000 });
        handleModalCloseDelete();
      });
  };

  const handleOpenModalDelete = async (id: number) => {
    setIdDelete(id);
    setModalDeleteOpen(true);
  };

  const handleModalCloseDelete = () => {
    setModalDeleteOpen(false);
  };

  const handleEditProduto = (data: IUser) => {
    setSelectItem(data);
    setOpenForm(true);
  };

  const handleModalOpen = () => {
    setOpenForm(true);
  };

  const handleModalClose = () => {
    setSelectItem(undefined);
    setOpenForm(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const fetchData = async () => {
      userService
        .getUsuario()
        .then((usuarios) => {
          setData(usuarios);
        })
        .catch((error) => {
          toast.error("Erro ao buscar os produtos:");
          console.error(error);
        });
    };

    if (localStorage.getItem("user") == null) {
      navigate("/");
      toast.error("Faça o login primeiro!");
    }
    if (localStorage.getItem("user")) {
      fetchData();
    }
  }, [selectItem, openForm, isModalDeleteOpen]);

  return (
    <div className="grid grid-cols-1 h-auto">
      <Navbar />
      <nav className="flex items-center space-x-2 text-gray-500 mx-9 my-10">
        <div className="flex items-center space-x-1">
          <Icon icon={"heroicons:home-solid"} />
          <a href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </a>
        </div>

        <span>/</span>

        <div className="flex items-center space-x-1">
          <a href="/gestao" className="text-gray-500 hover:text-gray-700">
            Gestão
          </a>
        </div>

        <span>/</span>

        <div className="flex items-center space-x-1">
          <a
            href="/controle-estoque"
            className="text-teal-600 font-medium hover:text-teal-700"
          >
            Controle de Usuário
          </a>
        </div>
      </nav>
      <div className=" mx-auto w-full">
        <div className="w-full text-center">
          <h1 className="text-2xl font-bold border-b-4 border-teal-600 inline-block ">
            Controle de Usuário
          </h1>
        </div>

        <div className="flex justify-start mx-24 my-10">
          <button
            disabled={!admin}
            onClick={handleModalOpen}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-800 flex items-center"
          >
            <Icon icon={"mdi:plus"} className="mr-2" fontSize={20} /> Cadastrar
            novo usuário
          </button>
        </div>

        <div className="bg-gray-100 ">
          <div className="grid grid-cols-3 items-center py-4 text-center mx-24">
            <div className="flex space-x-4">
              <button
                className={`flex items-center space-x-1 ${
                  sortConfig.key === "date" ? "font-bold" : ""
                }`}
                onClick={() => handleSort("date")}
              >
                <span>Mais recentes primeiro</span>
                {sortConfig.key === "date" &&
                  (sortConfig.direction === "asc" ? (
                    <Icon fontSize={20} icon={"heroicons:bars-arrow-up"} />
                  ) : (
                    <Icon fontSize={20} icon={"heroicons:bars-arrow-down"} />
                  ))}
              </button>

              <button
                className={`flex items-center space-x-1 text-sm ${
                  sortConfig.key === "name" ? "font-bold" : ""
                }`}
                onClick={() => handleSort("name")}
              >
                <span>De A a Z</span>
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "asc" ? (
                    <Icon fontSize={20} icon={"bi:sort-alpha-up-alt"} />
                  ) : (
                    <Icon fontSize={20} icon={"bi:sort-alpha-down-alt"} />
                  ))}
              </button>
            </div>
            <span>
              Mostrando Resultados - {data.length} de {data.length}
            </span>
            <div className="flex items-center space-x-2 justify-end">
              <button
                className={`px-2 py-1 ${
                  currentPage === 1 ? "text-gray-400" : "text-black"
                }`}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &lt;
              </button>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
                <button
                  key={page}
                  className={`px-2 py-1 ${
                    currentPage === page
                      ? "bg-teal-600 text-white rounded-full"
                      : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className={`px-2 py-1 ${
                  currentPage === 10 ? "text-gray-400" : "text-black"
                }`}
                disabled={currentPage === 10}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
        <div className=" flex justify-center h-3/6 overflow-auto">
          <table className="w-4/6 border-collapse">
            <thead>
              <tr className=" text-left">
                <th className="py-3 px-4">Nome completo</th>
                <th className="py-3 px-4">CPF</th>
                <th className="py-3 px-4">E-mail</th>
                <th className="py-3 px-4">Nome usuário</th>
                <th className="py-3 px-4">Cargo</th>
                <th className="py-3 px-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4">{item.nome}</td>
                  <td className="py-3 px-4">{item.cpf}</td>
                  <td className="py-3 px-4">{item.email}</td>
                  <td className="py-3 px-4">{item.nomeUsuario}</td>
                  <td className="py-3 px-4">
                    {item.admin ? "Administrador" : "Comum"}
                  </td>
                  <td className="py-3 px-4 flex items-center">
                    <button
                      disabled={admin ? false : true}
                      className={`${
                        admin
                          ? "text-red-900 hover:text-red-500 "
                          : "text-red-500 "
                      } `}
                      onClick={() => handleOpenModalDelete(item.id ?? 0)}
                    >
                      <Icon
                        icon={"heroicons:trash-solid"}
                        className="mr-3"
                        fontSize={19}
                      />
                    </button>
                    <button
                      disabled={admin ? false : true}
                      className={`${
                        admin
                          ? "text-gray-900 hover:text-gray-500"
                          : "text-gray-500 "
                      } `}
                      onClick={() => handleEditProduto(item)}
                    >
                      <Icon
                        icon={"heroicons:cog-6-tooth-20-solid"}
                        fontSize={19}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-100 ">
          <div className="grid grid-cols-3 items-center py-4 text-center mx-24">
            <div></div>
            <span>
              Mostrando Resultados - {data.length} de {data.length}
            </span>
            <div className="flex items-center space-x-2 justify-end">
              <button
                className={`px-2 py-1 ${
                  currentPage === 1 ? "text-gray-400" : "text-black"
                }`}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &lt;
              </button>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
                <button
                  key={page}
                  className={`px-2 py-1 ${
                    currentPage === page
                      ? "bg-teal-600 text-white rounded-full"
                      : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className={`px-2 py-1 ${
                  currentPage === 10 ? "text-gray-400" : "text-black"
                }`}
                disabled={currentPage === 10}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserModal
        isOpen={openForm}
        onClose={handleModalClose}
        receivedData={selectItem}
      />

      <ConfirmDeleteModal
        id={idDelete}
        isOpen={isModalDeleteOpen}
        onClose={handleModalCloseDelete}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ViewUsers;
