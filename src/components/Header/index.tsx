import {
  ContainerHeader,
  HeaderContainer,
  HeaderContent,
  NewTransactionButton,
} from "./styles";
import logo from "../../assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionModal";
import { NavLink } from "react-router-dom";
import {
  ChartLine,
  CurrencyCircleDollar,
  Receipt,
  Wallet,
} from "phosphor-react";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { NewInvestmentModal } from "../NewInvestmentModal";

export function Header() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  const investments = useContextSelector(TransactionsContext, (context) => {
    return context.investments;
  });

  return (
    <HeaderContainer>
      <HeaderContent>
        <NavLink to="/home">
          <img src={logo} alt="" />
        </NavLink>
        <ContainerHeader>
          {transactions.length >= 1 && (
            <NavLink to="/statistics">
              <ChartLine color="#ffffff" size={20} />
              Estatísticas
            </NavLink>
          )}
          {investments.length >= 1 && (
            <NavLink to="/investments">
              <CurrencyCircleDollar color="#ffffff" size={20} />
              Investimentos
            </NavLink>
          )}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewTransactionButton>
                <Receipt color="#ffffff" size={20} /> Nova Transação
              </NewTransactionButton>
            </Dialog.Trigger>
            <NewTransactionModal />
          </Dialog.Root>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewTransactionButton>
                <Wallet color="#ffffff" size={20} /> Novo Investimento
              </NewTransactionButton>
            </Dialog.Trigger>
            <NewInvestmentModal />
          </Dialog.Root>
        </ContainerHeader>
      </HeaderContent>
    </HeaderContainer>
  );
}
