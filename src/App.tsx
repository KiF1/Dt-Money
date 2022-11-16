import { ThemeProvider } from "styled-components";
import { TransactionsProvider } from "./contexts/TransactionsContext";
import { Transactions } from "./pages/Trasactions";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  )
}
