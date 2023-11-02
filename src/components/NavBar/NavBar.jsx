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
    console.log("Current role of user:"+auth.userRole);
  },[auth.userRole])
  return (
    <>
      <Nav>
        <Bars />

        {auth.userRole==="[USER]" ? (
          <NavMenu>
            <NavLink to="/">Jobs</NavLink>
            <NavLink to="/">Your Applications</NavLink>
          </NavMenu>
        ) : (
          <NavMenu>
            <NavLink to="/jobs">Your Jobs</NavLink>
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