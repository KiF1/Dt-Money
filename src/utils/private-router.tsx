import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Router } from "../Router";

export function ProtectedRoute({ children }: any) {
  const userLogged: boolean = localStorage.getItem("userLogged") === "true";
  const redirect = useNavigate();

  useEffect(() => {
    if (!userLogged) {
      redirect("/");
    }
  }, []);

  return userLogged ? children : <Router />;
}
