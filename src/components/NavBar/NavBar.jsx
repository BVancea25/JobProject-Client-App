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
  const role=localStorage.getItem("role");
  const [isAuth,setAuth]=useState('no');
  useEffect(()=>{
    
      if(role==="[USER]" || role==="[EMPLOYER]"){
        setAuth('yes');
      }
      
    }
  ,[role])
    
  
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

        {isAuth==='yes' ?(
          <NavBtn>
            <Logout/>
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