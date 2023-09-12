import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function GuestRoute({ children }: any) {
  const userLogged: boolean = localStorage.getItem("userLogged") === "true";
  const redirect = useNavigate();

  useEffect(() => {
    if (userLogged) {
      redirect("/home");
    }
  }, []);

  return children;
}
