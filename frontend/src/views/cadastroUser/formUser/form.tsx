import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputText from "../../../componentes/form/inputText";
import { IUser } from "../../../interface";
import { userService } from "../../../service/user";
import SelectField from "../../../componentes/form/SelectForm";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  receivedData?: IUser;
}

function UserModal({ isOpen, onClose, receivedData }: UserModalProps) {
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState<IUser>({
    cpf: "",
    senha: "",
    admin: false,
    nome: "",
    nomeUsuario: "",
  });
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");
  const options = [
    { value: false, label: "Comum" },
    { value: true, label: "Administrador" },
  ];

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

    if (confirmaSenha === formValues.senha) {
      if (editMode) {
        try {
          await userService.updateUsuario(formValues.id ?? 0, formValues);
          onClose();
          toast.success("Edição concluída com sucesso!", { duration: 2000 });
        } catch (error) {
          console.error(error);
          toast.error("Erro ao editar atendimento!");
        }
      } else {
        try {
          await userService.createUser(formValues);
          toast.success("Usuário cadastrado com sucesso!", {
            duration: 2000,
          });
          HandleModalClose();
        } catch (error: any) {
          console.error(error);
          toast.error(error.response.data.message);
        }
      }
    }
  };

  const HandleModalClose = async () => {
    await setFormValues({
      cpf: "",
      senha: "",
      admin: false,
      nome: "",
      nomeUsuario: "",
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
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {editMode ? "Gerenciar usuário" : "Cadastrar novo usuário"}
          </h2>
          <button onClick={HandleModalClose}>
            <Icon icon={"mdi:close"} fontSize={20} />
          </button>
        </div>
        <hr className="border-gray-300 mb-4" />
        <div className="flex items-end">
          <div className="relative">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              S
            </div>

            <div className="absolute bottom-0 right-0 bg-white text-blue-700 w-6 h-6 rounded-full flex items-center justify-center">
              <Icon icon={"heroicons-outline:camera"} />
            </div>
          </div>
          <span className="ml-2 text-blue-700 font-medium text-lg ">
            Carregar foto
          </span>
        </div>

        <form className="grid grid-cols-3 gap-5 mt-10" onSubmit={handleSubmit}>
          <InputText
            label="Nome completo"
            name="nome"
            placeholder="Insira seu nome completo"
            value={formValues.nome}
            required
            typeInput="text"
            onChange={handleInputChange}
          />
          <InputText
            label="CPF"
            name="cpf"
            typeInput="text"
            required
            placeholder="Insira seu CPF, somente os números"
            value={formValues.cpf}
            onChange={handleInputChange}
          />
          <InputText
            label="E-mail"
            name="email"
            typeInput="email"
            placeholder="Insira seu melhor e-mail"
            value={formValues.email}
            onChange={handleInputChange}
          />
          <InputText
            label="Nome de usuário"
            placeholder="Insira seu nome de usuário"
            value={formValues.nomeUsuario}
            name="nomeUsuario"
            required
            typeInput="text"
            onChange={handleInputChange}
          />
          <InputText
            label="Senha"
            required
            name="senha"
            typeInput="password"
            placeholder="Insira sua senha"
            value={formValues.senha}
            onChange={handleInputChange}
          />
          <InputText
            label="Confirmar senha"
            typeInput="password"
            required
            name="confirmaSenha"
            placeholder="Insira sua senha novamente"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
          />
          <SelectField
            name="admin"
            label="Cargo"
            options={options}
            required
            value={formValues.admin}
            onChange={handleInputChange}
          />
          <div className="col-span-2"></div>
          <div className="col-span-2"></div>

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

export default UserModal;
