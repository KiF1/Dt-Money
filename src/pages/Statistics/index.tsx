import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BoxGraphics, ContainerGraphics } from "./styles";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { priceFormatter } from "../../utils/formatter";

export function Statistics() {
  const transactionsIncome = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.transactions
        .filter((transaction) => transaction.type === "income")
        .map((transaction) => {
          return {
            atividade: transaction.description,
            total: transaction.price,
          };
        });
    }
  );

  const transactionsOutcome = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.transactions
        .filter((transaction) => transaction.type === "outcome")
        .map((transaction) => {
          return {
            atividade: transaction.description,
            total: transaction.price,
          };
        });
    }
  );

  return (
    <div>
      <Header />
      <Summary />
      <ContainerGraphics>
        <BoxGraphics>
          <h1>Valores em Caixa</h1>
          <ResponsiveContainer width="100%" height="100%" className="graphic">
            <AreaChart
              width={500}
              height={400}
              data={transactionsIncome}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="atividade" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#00875F"
                fill="#00875F"
              />
            </AreaChart>
          </ResponsiveContainer>
        </BoxGraphics>
        <BoxGraphics>
          <h1>Valores Subtraídos Do Caixa</h1>
          <ResponsiveContainer width="100%" height="100%" className="graphic">
            <AreaChart
              width={500}
              height={400}
              data={transactionsOutcome}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="atividade" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#AB222E"
                fill="#AB222E"
              />
            </AreaChart>
          </ResponsiveContainer>
        </BoxGraphics>
      </ContainerGraphics>
    </div>
  );
}
