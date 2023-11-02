import { useContext } from "react";
import AuthContext from "../components/Authentication/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;