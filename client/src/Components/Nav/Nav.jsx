import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../Image/Logosinfondo.png'
import style from "../../Styles/StyleNav.module.css"
import { filterData} from "./SidebarData";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from 'react-icons';
import './Nav.css'
import { useSelector } from "react-redux";
import Logout from "../Acount/Logout"
import SearchBar from '../SearchBar/SearchBar'
import ButtonLogin from "../Acount/ButtonLogin";
import ButtonRegister from "../Acount/ButtonRegister";
import Inventary from "../Inventary/Inventary";

export default function Nav() {
  const token = useSelector(state => state.token);
  const user = useSelector(state => state.user);

  const data = filterData(user, token)



  const [sidebar, setSidebar] = useState(false)



  const showSidebar = () => setSidebar(!sidebar)

 
  return (
    <div id={style.nav}>
      <IconContext.Provider value={{ color: '#F2F0D5' }}>

        <div>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <div className='navbar'>
          <Link className="navbar-brand" to='/'>
            <img className={style.img} src={logo} alt='logo' />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
          { 
            data.map((item,index) => {
              return(
                <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span color ="#F2F0D5">{item.title}</span>
                </Link>
              </li>
              )
            })
          }
          {
            (!token) ?
            <div>
              < ButtonLogin />
              < ButtonRegister />
            </div> :
            null
          }
          {
           ( !!token ) ?
              <div>
                <Inventary/>
                <Logout/>
              </div>:
              null
          }
            
          </ul>
        </nav>
      </IconContext.Provider>
      <div className={style.cName}>

       <SearchBar />
      </div>
    </div>
  );
}
