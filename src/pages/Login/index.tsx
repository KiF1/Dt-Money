import { z } from "zod";
import { Content, ErrorMessage, LinkNavigation, Overlay } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowRight } from "phosphor-react";

const loginFormSchema = z.object({
  email: z.string().min(6, { message: "Informe um email válido" }).email(),
  password: z.string().min(6, "Informe a Senha correta"),
});

type LoginFormInputs = z.infer<typeof loginFormSchema>;
export function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  });
  const redirect = useNavigate();

  async function handleLogin() {
    await localStorage.setItem("userLogged", "true");
    await redirect("/home");
  }
  return (
    <Overlay>
      <Content>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <ErrorMessage>
            <input
              type="text"
              placeholder="E-mail"
              required
              {...register("email")}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </ErrorMessage>
          <ErrorMessage>
            <input
              type="text"
              placeholder="Senha"
              required
              {...register("password")}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </ErrorMessage>
          <button disabled={isSubmitting} type="submit">
            Entrar
          </button>
          <LinkNavigation>
            <NavLink to="/newuser">Cadastrar Usuário</NavLink>
            <ArrowRight color="#00875F" size={20} />
          </LinkNavigation>
        </form>
      </Content>
    </Overlay>
  );
}
