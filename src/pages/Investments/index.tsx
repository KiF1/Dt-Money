import { useContextSelector } from "use-context-selector";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { SearchForm } from "./components/SearchForm";
import { BoxCardInvestments, Container, ContainerInvestments } from "./styles";
import { dateFormatter, priceFormatter } from "../../utils/formatter";

export function Investments() {
  const withdrawInvestment = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.withdrawInvestment;
    }
  );

  function disableWithdraw(dateInvestment: Date, periodInvestment: number) {
    const actualDate = new Date();
    const MonthsDifference =
      (actualDate.getFullYear() - dateInvestment.getFullYear()) * 12 +
      (actualDate.getMonth() - dateInvestment.getMonth());
    if (MonthsDifference >= periodInvestment) {
      return false;
    }

    return true;
  }

  const investments = useContextSelector(TransactionsContext, (context) => {
    return context.investments.map((investment) => {
      return {
        id: investment.id,
        description: investment.description,
        value: investment.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        period: investment.period,
        withdraw: investment.withdraw,
        createdAt: dateFormatter.format(new Date(investment.createdAt)),
        disableWithdraw: disableWithdraw(
          new Date(investment.createdAt),
          investment.period
        ),
      };
    });
  });

  return (
    <div>
      <Header />
      <Summary />
      <Container>
        <SearchForm />
        <ContainerInvestments>
          {investments.map((investment) => (
            <BoxCardInvestments key={investment.id}>
              <h1>{investment.description}</h1>
              <strong>
                Valor Investido: <span>{investment.value}</span>
              </strong>
              <strong>
                Possível Saque:{" "}
                <span>{priceFormatter.format(investment.withdraw)}</span>
              </strong>
              <strong>
                Período de Investimento: {investment.period} meses
              </strong>
              <strong>{investment.createdAt}</strong>
              <button
                onClick={() => withdrawInvestment(investment.id)}
                disabled={investment.disableWithdraw}
                type="button"
              >
                Sacar Investimento
              </button>
            </BoxCardInvestments>
          ))}
        </ContainerInvestments>
      </Container>
    </div>
  );
}
