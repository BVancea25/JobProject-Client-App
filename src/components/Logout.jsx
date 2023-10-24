import axios from "axios";
import { NavBtnLink } from "./NavBar/NavBarElements";

const Logout = () => {

  const handleLogout = () => {
    axios
      .post("http://localhost:8080/logout")
      .then(() => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("role");
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