import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IProduto } from "../../../interface";
import { produtoService } from "../../../service/produto";
import InputText from "../../../componentes/form/inputText";
import { formatDate } from "../../../functions";

interface ProdutoModalProps {
  isOpen: boolean;
  onClose: () => void;
  receivedData?: IProduto;
}

function ProdutoModal({ isOpen, onClose, receivedData }: ProdutoModalProps) {
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState<IProduto>({
    estoque: 1,
    nome: "",
    precoVenda: 0,
    userId: 0,
  });

  const handleIncrement = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      estoque: prevValues.estoque + 1,
    }));
  };

  const handleDecrement = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      estoque: prevValues.estoque > 1 ? prevValues.estoque - 1 : 1,
    }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, type, value } = target;

    let newValue: any = value;

    if (type === "checkbox") {
      newValue = target.checked ? 1 : 0;
    }

    if (name === "admin") {
      newValue = value === "true";
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editMode) {
      try {
        await produtoService.updateProduto(formValues.id ?? 0, formValues);
        onClose();
        toast.success("Edição concluída com sucesso!", { duration: 2000 });
      } catch (error) {
        console.error(error);
        toast.error("Erro ao editar atendimento!");
      }
    } else {
      const idUser = JSON.parse(localStorage.getItem("user") || "{}").id || 0;

      const newFormValues: IProduto = { ...formValues, userId: idUser };
      try {
        await produtoService.createProduto(newFormValues);
        toast.success("Usuário cadastrado com sucesso!", {
          duration: 2000,
        });
        HandleModalClose();
      } catch (error: any) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    }
  };

  const HandleModalClose = async () => {
    await setFormValues({
      estoque: 0,
      nome: "",
      precoVenda: 0,
      userId: 0,
    });
    setEditMode(false);
    onClose();
  };

  useEffect(() => {
    if (receivedData !== undefined) {
      setEditMode(true);
      setFormValues({ ...receivedData });
    } else {
      setEditMode(false);
    }
  }, [receivedData, editMode]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {editMode ? "Gerenciar produto" : "Cadastrar novo produto"}
          </h2>
          <button onClick={HandleModalClose}>
            <Icon icon={"mdi:close"} fontSize={20} />
          </button>
        </div>
        <hr className="border-gray-300 mb-4" />
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <InputText
            label="Data de Cadastro"
            name="dataCadastro"
            placeholder="dd/mm/aaaa"
            value={
              formatDate(formValues.dataCadastro) || formValues.dataCadastro
            }
            required
            disabledInput={true}
            typeInput="date"
            onChange={handleInputChange}
          />
          <div></div>
          <div className=" col-span-2 grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <InputText
                label="Nome do produto"
                name="nome"
                placeholder=""
                value={formValues.nome}
                required
                typeInput="text"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-[14px] font-roboto font-normal leading-[24px] tracking-[0.3px]"
                style={{
                  color:
                    "var(--Neutral-Light-1000, var(--Color-Neutral-Light-1000, #262F2F))",
                }}
              >
                *Quantidade
              </label>
              <div className="flex items-center border border-teal-600 rounded px-2">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className=" text-teal-600 hover:text-teal-700 focus:outline-none"
                >
                  <Icon icon={"heroicons:minus"} />
                </button>
                <input
                  type="number"
                  name="estoque"
                  required
                  value={formValues.estoque}
                  onChange={handleInputChange}
                  className="w-full h-10 text-center ml-1 border-none focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleIncrement}
                  className=" text-teal-600 hover:text-teal-700 focus:outline-none"
                >
                  <Icon icon={"heroicons:plus"} />
                </button>
              </div>
            </div>
          </div>

          <InputText
            label="Valor R$"
            name="precoVenda"
            placeholder=""
            value={formValues.precoVenda}
            required
            typeInput="number"
            onChange={handleInputChange}
          />
          <div></div>
          <div></div>

          <div className="flex justify-end items-center space-x-4">
            <button
              type="button"
              onClick={HandleModalClose}
              className="text-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded"
            >
              {editMode ? "Atualizar" : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProdutoModal;
