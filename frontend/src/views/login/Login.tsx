import { useState } from "react";
import CheckboxField from "../../componentes/form/inputCheckBox";
import InputText from "../../componentes/form/inputText";
import { ILogin } from "../../interface";
import toast from "react-hot-toast";
import { loginService } from "../../service/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formValues, setFormValues] = useState<ILogin>({
    cpf: "",
    senha: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = event.target as HTMLInputElement;
    const { name, type, value } = target;
    let newValue: any = value;

    if (type === "checkbox") {
      newValue = target.checked ? 1 : 0;
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = await loginService.postForm(formValues);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Operação bem sucedida!", {
        duration: 2000,
      });
      navigate("/home");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="flex bg-teal-800 justify-center items-center">
        <div className="flex flex-col items-end mb-56">
          <p
            className="text-[40px] font-roboto font-bold leading-[60px]"
            style={{
              color:
                "var(--Neutral-Light-0, var(--Color-Neutral-Light-0, #FFF))",
            }}
          >
            Bem-Vindo!
          </p>
          <img src="/SistemaGerencialTXAI.svg" alt="Sistema Gerencial TXAI" />
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <form
          className="flex flex-col items-start mb-8 w-6/12 gap-3"
          onSubmit={handleSubmit}
        >
          <p className="text-4xl font-roboto font-bold leading-[60px]">Login</p>

          <InputText
            name="cpf"
            label="CPF"
            placeholder="Insira seu CPF, somente os números"
            value={formValues.cpf}
            typeInput="text"
            onChange={handleInputChange}
          />
          <InputText
            label="Senha"
            name="senha"
            placeholder="Insira sua senha"
            value={formValues.senha}
            typeInput="password"
            onChange={handleInputChange}
          />

          <div className="flex justify-between items-center w-full">
            <CheckboxField
              label="Lembrar minha senha"
              checked={isChecked}
              onChange={setIsChecked}
            />
            <a
              href=""
              className="w-full text-end"
              style={{
                color: "var(--Green-600, var(--Color-Green-600, #2D7575))",
              }}
            >
              Esqueci minha senha
            </a>
          </div>
          <button
            type="submit"
            className="rounded-[3px] text-white px-4 py-2 w-full mt-3"
            style={{
              background: "var(--Color-Green-600, #2D7575)",
            }}
          >
            Entrar
          </button>
          <p className="text-xs  leading-[24px] tracking-[0.3px] w-full text-center">
            Não tem uma conta?{" "}
            <a
              href="/cadastroUser"
              style={{
                color: "var(--Green-600, var(--Color-Green-600, #2D7575))",
              }}
            >
              cadastre-se agora
            </a>
          </p>
          <p className="text-xs text-gray-500 leading-[24px] tracking-[0.3px] w-full text-center mt-16">
            Ajuda • Política de privacidade
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
