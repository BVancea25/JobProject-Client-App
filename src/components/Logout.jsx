import axios from "axios";
import useAuth from "../hooks/useAuth";
import { NavBtnLink } from "./NavBar/NavBarElements";

const Logout = () => {
  const {setAuth}=useAuth();
  var jwt="",
  userRole="";
  const handleLogout = () => {
    axios
      .post("http://localhost:8080/logout")
      .then((res) => {
        if(res.status===200){
             setAuth({userRole,jwt});
             console.log(userRole);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <NavBtnLink to="/" onClick={handleLogout}>
      Logout
    </NavBtnLink>
  );
};

export default Logout;