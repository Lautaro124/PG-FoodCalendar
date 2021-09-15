import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../Image/Logosinfondo.png'
//import style from "../../Styles/StyleNav.module.css"
import { SidebarDataNotUser, SidebarDataUser, SidebarDataAdmin} from "./SidebarData";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from 'react-icons';
import './Nav.css'
import { useSelector } from "react-redux";
import Logout from "../Acount/Logout"




export default function Nav() {
  const token = useSelector(state => state.token);
  const user = useSelector(state => state.user);


  const [sidebar, setSidebar] = useState(false)



  const showSidebar = () => setSidebar(!sidebar)

 // const alho = filter(token, user)
 
  return (
    <div>
      <IconContext.Provider value={{ color: '#F2F0D5' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <Link className="navbar-brand" to='/'>
            <img width="55%" height="45%" src={logo} alt='logo' />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {(!token) ? 
              SidebarDataNotUser.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span color ="#F2F0D5">{item.title}</span>
                  </Link>
                </li>
              );
            }) : null
            }
            {!!token  && user.category !== 'Admin' ? 
            SidebarDataUser.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );} 
            ) : null
            }
            {(!!token && user.category === 'Admin') ? 
            SidebarDataAdmin.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>    
                </li>
              );
            }) : null

          }
          {
           ( !!token ) ?
              <li>
                <Logout/>
              </li>:
              null
          }
            
          </ul>
        </nav>
      </IconContext.Provider>

    </div>
  );
}
