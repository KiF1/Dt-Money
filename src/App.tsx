import { ThemeProvider } from "styled-components";
import { TransactionsProvider } from "./contexts/TransactionsContext";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <TransactionsProvider>
          <Router />
        </TransactionsProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
