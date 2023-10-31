import React, { useEffect, useState } from 'react'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavBarElements";
import Logout from '../Logout';

function Navbar(){
  const [role,setRole]=useState('');
  useEffect(()=>{
   if(localStorage.getItem("role")){
    setRole(localStorage.getItem("role"));
   }
   else{
    setRole('');
   } 
  },[role])

  const logoutCallBack=()=>{
    setRole('');
  }
  return (
    <>
      <Nav>
        <Bars />

        {role==="[USER]" ? (
          <NavMenu>
            <NavLink to="/">Jobs</NavLink>
            <NavLink to="/">Your Applications</NavLink>
          </NavMenu>
        ) : (
          <NavMenu>
            <NavLink to="/produse">Produse</NavLink>
            <NavLink to="/locatii">Locatii</NavLink>
            <NavLink to="/comanda">Comanda</NavLink>
          </NavMenu>
        )}

        

        {role!=='' ?(
          <NavBtn>
            <Logout setRole={logoutCallBack}/>
          </NavBtn>
        ) : (
          <NavBtn>
            <NavBtnLink to="/register">Log In</NavBtnLink>
          </NavBtn>
        )}
      </Nav>
    </>
  );
};

export default Navbar;