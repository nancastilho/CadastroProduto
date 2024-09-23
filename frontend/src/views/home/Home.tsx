import { useEffect, useState } from "react";
import Navbar from "../../componentes/navbar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IProduto } from "../../interface";
import { produtoService } from "../../service/produto";
import toast from "react-hot-toast";
import { formatarDataBrasil, formatCurrency } from "../../functions";
import ProdutoModal from "../../componentes/modalProduto/form";
import ConfirmDeleteModal from "../../componentes/modalProduto/delete";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectItem, setSelectItem] = useState<IProduto>();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [data, setData] = useState<IProduto[]>([]);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
const [idDelete, setIdDelete] = useState(0);

  const handleDelete = (id: number) => {
   
    produtoService
      .deleteProduto(id)
      .then(() => {
        toast.success("Produto deletado com sucesso!", { duration: 2000 });
        handleModalCloseDelete();
      })
      .catch(() => {
        toast.error("Erro ao deletar produto!", { duration: 2000 });
        handleModalCloseDelete();
      });
  };

  const handleOpenModalDelete = async(id: number) => {
    setIdDelete(id)
    setModalDeleteOpen(true);
  };


  const handleModalCloseDelete = () => {
    setModalDeleteOpen(false);
  };

  const handleEditProduto = (data: IProduto) => {
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
    produtoService
      .getProdutos()
      .then((produtos) => {
        setData(produtos);
      })
      .catch((error) => {
        toast.error("Erro ao buscar os produtos:");
        console.error(error);
      });
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
            Controle de Estoque
          </a>
        </div>
      </nav>
      <div className=" mx-auto w-full">
        <div className="w-full text-center">
          <h1 className="text-2xl font-bold border-b-4 border-teal-600 inline-block ">
            Controle de Estoque
          </h1>
        </div>

        <div className="flex justify-start mx-24 my-10">
          <button
            onClick={handleModalOpen}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-800 flex items-center"
          >
            <Icon icon={"mdi:plus"} className="mr-2" fontSize={20} /> Cadastrar
            novo produto{" "}
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
                <th className="py-3 px-4">Data de cadastro</th>
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">Valor unitário</th>
                <th className="py-3 px-4">Quantidade</th>
                <th className="py-3 px-4">Valor total</th>
                <th className="py-3 px-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4">
                    {formatarDataBrasil(item.dataCadastro)}
                  </td>
                  <td className="py-3 px-4">{item.nome}</td>
                  <td className="py-3 px-4">
                    {formatCurrency(item.precoVenda)}
                  </td>
                  <td className="py-3 px-4">{item.estoque}</td>
                  <td className="py-3 px-4">
                    {formatCurrency(item.estoque * item.precoVenda)}
                  </td>
                  <td className="py-3 px-4 flex items-center">
                    <button
                      className="text-red-900"
                      onClick={() => handleOpenModalDelete(item.id ?? 0)}
                    >
                      <Icon icon={"heroicons:trash-solid"} className="mr-3" />
                    </button>
                    <button
                      className="text-gray-900"
                      onClick={() => handleEditProduto(item)}
                    >
                      <Icon icon={"heroicons:cog-6-tooth-20-solid"} />
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
      <ProdutoModal
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

export default Home;
