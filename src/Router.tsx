import { Route, Routes } from "react-router-dom";
import { Transactions } from "./pages/Trasactions";
import { GuestRoute } from "./utils/guest-router";
import { ProtectedRoute } from "./utils/private-router";
import { Login } from "./pages/Login";
import { NewUser } from "./pages/NewUser";
import { Statistics } from "./pages/Statistics";
import { Investments } from "./pages/Investments";

export function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/newuser"
        element={
          <GuestRoute>
            <NewUser />
          </GuestRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/statistics"
        element={
          <ProtectedRoute>
            <Statistics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/investments"
        element={
          <ProtectedRoute>
            <Investments />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
