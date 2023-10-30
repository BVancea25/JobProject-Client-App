import axios from "axios";
import { NavBtnLink } from "./NavBar/NavBarElements";

const Logout = ({logoutCallBack}) => {

  const handleLogout = () => {
    axios
      .post("http://localhost:8080/logout")
      .then((res) => {
        if(res.status===200){
          window.localStorage.clear();      
          logoutCallBack();
        }
      })
      .catch((err) => {
        console.log(err);
        window.localStorage.clear();   
      });
  };
  return (
    <NavBtnLink to="/" onClick={handleLogout}>
      Logout
    </NavBtnLink>
  );
};

export default Logout;