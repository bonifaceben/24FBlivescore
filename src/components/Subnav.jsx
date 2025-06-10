import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NavLink } from 'react-router-dom';


const Subnav = () => {
   

  return (
    <div className="sports-nav text-white py-1">
  <div className="container d-flex justify-content-between flex-wrap">

    {/* Football */}
    <NavLink
      to="/"
      className={({ isActive }) =>
        `text-decoration-none flex-fill text-center nav-item-custom ${isActive ? 'active' : 'inactive'}`
      }
    >
      <div>
        <i className="bi bi-trophy fs-4"></i>
        <div>Football</div>
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
        <i className="bi bi-basket2-fill fs-4"></i>
        <div>Basketball</div>
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
        <i className="bi bi-award fs-4"></i>
        <div>Tennis</div>
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
        <i className="bi bi-shield-fill fs-4"></i>
        <div>Cricket</div>
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
        <i className="bi bi-snow fs-4"></i>
        <div>Hockey</div>
      </div>
    </NavLink>

    {/* Favourites */}
    <NavLink
      to="/favourites"
      className={({ isActive }) =>
         `text-decoration-none flex-fill text-center nav-item-custom ${isActive ? 'active' : 'inactive'}`
      }
    >
      <div>
        <i className="bi bi-star-fill fs-4"></i>
        <div className="favetext">Fav</div>
      </div>
    </NavLink>

  </div>
</div>




  );
};

export default Subnav;
