import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { CloseButton, Content, Overlay } from "./styles";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../contexts/TransactionsContext";

const newInvestmentFormSchema = z.object({
  description: z.string(),
  value: z.number(),
  period: z.number(),
});

type NewInvestmentFormInputs = z.infer<typeof newInvestmentFormSchema>;

export function NewInvestmentModal() {
  const createInvestment = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createInvestment;
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewInvestmentFormInputs>({
    resolver: zodResolver(newInvestmentFormSchema),
  });

  async function handleCreateNewInvestment(data: NewInvestmentFormInputs) {
    const { description, value, period } = data;
    await createInvestment({ value, period, description });
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Novo Investimento</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewInvestment)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register("value", { valueAsNumber: true })}
          />
          <input
            type="number"
            placeholder="Período em Meses"
            required
            {...register("period", { valueAsNumber: true })}
          />
          <button disabled={isSubmitting} type="submit">
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
