import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthenticatedRedirect = () => {
  const navigate = useNavigate();
  console.log('NAVIGATE!')

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (true) navigate("/dashboard");
  }, [navigate]);

  return null; // You can render null or a loading component here
};

export default AuthenticatedRedirect;
