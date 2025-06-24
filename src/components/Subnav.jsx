import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NavLink } from 'react-router-dom';
import footballlogo from '../assets/footballlogo.png'
import basketball from '../assets/basketball.png'
import tenis from '../assets/tenis.png'
import cricket from '../assets/cricket.png'
import hockey from '../assets/hockey.png'
import star from '../assets/star.png'



const Subnav = () => {
   

  return (
    <div className="sports-nav ">
  <div className="container d-flex justify-content-between flex-wrap">

    {/* Football */}
    <NavLink
      to="/"
      className={({ isActive }) =>
        `text-decoration-none flex-fill text-center nav-item-custom ${isActive ? 'active' : 'inactive'}`
      }
    >
      <div>
        <img src={footballlogo} alt="football" height="20" className="me-2" />
        <div className='subnavtext'>Football</div>
      </div>
    </NavLink>

    {/* Basketball */}
    <NavLink
      to="/basket-ball"
      className={({ isActive }) =>
         `text-decoration-none flex-fill text-center nav-item-custom ${isActive ? 'active' : 'inactive'}`
      }
    >
      <div>
        <img src={basketball} alt="football" height="20" className="me-2" />
        <div className='subnavtext'>Basketball</div>
      </div>
    </NavLink>

    {/* Tennis */}
    <NavLink
      to="/tennis"
      className={({ isActive }) =>
         `text-decoration-none flex-fill text-center nav-item-custom ${isActive ? 'active' : 'inactive'}`
      }
    >
      <div>
         <img src={tenis} alt="football" height="20" className="me-2" />
        <div className='subnavtext'>Tennis</div>
      </div>
    </NavLink>

    {/* Cricket */}
    <NavLink
      to="/cricket"
      className={({ isActive }) =>
         `text-decoration-none flex-fill text-center nav-item-custom ${isActive ? 'active' : 'inactive'}`
      }
    >
      <div>
         <img src={cricket} alt="football" height="20" className="me-2" />
        <div className='subnavtext'>Cricket</div>
      </div>
    </NavLink>

    {/* Hockey */}
    <NavLink
      to="/hockey"
      className={({ isActive }) =>
         `text-decoration-none flex-fill text-center nav-item-custom ${isActive ? 'active' : 'inactive'}`
      }
    >
      <div>
         <img src={hockey} alt="football" height="20" className="me-2" />
        <div className='subnavtext'>Hockey</div>
      </div>
    </NavLink>

    {/* Favourites */}
    <NavLink
      to="/Favourites"
      className={({ isActive }) =>
         `text-decoration-none flex-fill text-center nav-item-custom ${isActive ? 'active' : 'inactive'}`
      }
    >
      <div>
         <img src={star} alt="football" height="20" className="me-2" />
        <div className="favetext">Fav</div>
      </div>
    </NavLink>

  </div>
</div>




  );
};

export default Subnav;
