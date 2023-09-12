import { z } from "zod";
import { Content, ErrorMessage, LinkNavigation, Overlay } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";

const newUserFormSchema = z.object({
  name: z.string().min(3, { message: "Informe um nome válido" }),
  email: z.string().min(6, { message: "Informe um email válido" }).email(),
  password: z.string().min(6, "Informe a Senha correta"),
});

type NewUserFormInputs = z.infer<typeof newUserFormSchema>;
export function NewUser() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewUserFormInputs>({
    resolver: zodResolver(newUserFormSchema),
  });
  const redirect = useNavigate();

  async function handleNewUser() {
    await localStorage.setItem("userLogged", "true");
    await redirect("/home");
  }
  return (
    <Overlay>
      <Content>
        <h1>Cadastrar Usuário</h1>
        <form onSubmit={handleSubmit(handleNewUser)}>
          <ErrorMessage>
            <input
              type="text"
              placeholder="Nome"
              required
              {...register("name")}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </ErrorMessage>
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
            Cadastrar
          </button>
          <LinkNavigation>
            <ArrowLeft color="#00875F" size={20} />
            <NavLink to="/">Login</NavLink>
          </LinkNavigation>
        </form>
      </Content>
    </Overlay>
  );
}
