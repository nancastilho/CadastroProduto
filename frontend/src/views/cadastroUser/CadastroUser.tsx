import { useState } from "react";
import InputText from "../../componentes/form/inputText";
import SelectField from "../../componentes/form/SelectForm";
import { Icon } from "@iconify/react";
import { IUser } from "../../interface";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userService } from "../../service/user";

const CadastroUser = () => {
  const navigate = useNavigate();
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
      try {
        const userData = await userService.createUser(formValues);
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success("Usuário cadastrado com sucesso!", {
          duration: 2000,
        });
        navigate("/");
      } catch (error: any) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("A senha esta diferente da confirmação de senha!");
    }
  };

  return (
    <div className="mx-40 my-32 grid grid-cols-1 gap-4">
      <img src="/SistemaGerencialTXAIBlack.svg" alt="Sistema Gerencial TXAI" />
      <div>
        <p className="text-4xl font-roboto font-bold leading-[60px]">
          Faça seu cadastro
        </p>
        <p className="text-xs text-gray-500 leading-[24px] tracking-[0.3px] w-full ">
          *Campos obrigatórios
        </p>
      </div>
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

        <div className="col-span- flex items-center justify-evenly w-full col">
          <a href="/" className="flex items-center text-gray-500">
            <Icon
              icon={"heroicons:arrow-uturn-left"}
              className="pr-2"
              fontSize={22}
            />{" "}
            Voltar ao Login
          </a>
          <button
            type="submit"
            className="rounded-[3px] text-white px-4 py-2 "
            style={{
              background: "var(--Color-Green-600, #2D7575)",
            }}
          >
            Concluir cadastro
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroUser;
