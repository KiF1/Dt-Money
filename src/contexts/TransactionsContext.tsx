import { ReactNode, useEffect, useState, useCallback } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

interface Investment {
  id: number;
  description: string;
  value: number;
  period: number;
  withdraw: number;
  createdAt: string;
}

interface CreateInvestmentInput {
  description: string;
  value: number;
  period: number;
}

interface TransactionContextType {
  transactions: Transaction[];
  investments: Investment[];
  fetchTransactions: (query?: string) => Promise<void>;
  fetchInvestments: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
  createInvestment: (data: CreateInvestmentInput) => Promise<void>;
  withdrawInvestment: (id: number) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get("transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });

    setTransactions(response.data);
  }, []);

  const fetchInvestments = useCallback(async (query?: string) => {
    const response = await api.get("investments", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });

    setInvestments(response.data);
  }, []);

  const withdrawInvestment = useCallback(async (id: number) => {
    const responseGetInvestiment = await api.get(`investments/${id}`);
    const responseTransaction = await api.get("transactions", {
      params: {
        q: responseGetInvestiment.data.description,
      },
    });
    await api.put(`transactions/${responseTransaction.data[0].id}`, {
      description: responseGetInvestiment.data.description,
      category: `Saque do Investimento: ${responseGetInvestiment.data.description}`,
      price: responseGetInvestiment.data.withdraw,
      type: "income",
      createdAt: new Date(),
    });
    await api.delete(`investments/${id}`);

    const responseInvestments = await api.get("investments", {
      params: {
        _sort: "createdAt",
        _order: "desc",
      },
    });
    const responseTransactions = await api.get("transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
      },
    });

    setInvestments(responseInvestments.data);
    setTransactions(responseTransactions.data);
  }, []);

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { category, description, price, type } = data;
      const response = await api.post("transactions", {
        description,
        category,
        price,
        type,
        createdAt: new Date(),
      });
      setTransactions((state) => [response.data, ...state]);
    },
    []
  );

  function calcInvestmentReturn(value: number, period: number) {
    const rateInterestPeriod = 0.05 / 12;

    const withdraw = value * Math.pow(1 + rateInterestPeriod, period);

    return parseFloat(withdraw.toFixed(2));
  }

  const createInvestment = useCallback(async (data: CreateInvestmentInput) => {
    const { value, period, description } = data;
    const responseInvestment = await api.post("Investments", {
      description,
      value,
      period,
      withdraw: calcInvestmentReturn(value, period),
      createdAt: new Date(),
    });
    const responseTransaction = await api.post("transactions", {
      description,
      category: "Investimento",
      price: value,
      type: "outcome",
      createdAt: new Date(),
    });

    setInvestments((state) => [responseInvestment.data, ...state]);
    setTransactions((state) => [responseTransaction.data, ...state]);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    fetchInvestments();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        investments,
        fetchTransactions,
        fetchInvestments,
        createTransaction,
        createInvestment,
        withdrawInvestment,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
