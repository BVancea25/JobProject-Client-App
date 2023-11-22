import React, { useEffect } from 'react'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavBarElements";
import Logout from '../Logout';
import useAuth from "../../hooks/useAuth";

function Navbar(){
  const {auth}=useAuth();
  useEffect(()=>{
    
  },[auth.userRole])
  return (
    <>
      <Nav>
        <Bars />

        {auth.userRole==="[EMPLOYER]" ? (
         <NavMenu>
         <NavLink to="/jobs">Your Jobs</NavLink>
         <NavLink to="/application/employer">Applications</NavLink>
         <NavLink to="/chatE">Chats</NavLink>
        </NavMenu>
        ) : auth.userRole==="[USER]" ? (
          <NavMenu>
          <NavLink to="/">Jobs</NavLink>
          <NavLink to="/application/user">Your Applications</NavLink>
          <NavLink to="/chatU">Chats</NavLink>
        </NavMenu>
        ):(
          <NavMenu>
            <NavLink to="/">Jobs</NavLink>
          </NavMenu>
        )}

        

        {auth?.userRole==='[USER]' || auth?.userRole==='[EMPLOYER]' ?(
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