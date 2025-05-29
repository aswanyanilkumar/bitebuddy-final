//src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useAdmin } from '../context/AdminContext';
import logo from '../assets/images/logo.png';

function Navbar() {
  const { user, logout } = useUser();
  const { admin, logoutAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (user) {
      logout();
      navigate('/user/auth');
    } else if (admin) {
      logoutAdmin();
      navigate('/admin/auth');
    }
  };

  return (
    <nav className="w-full bg-[#bbcac8]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center">
       <h1> <div className="text-2xl font-bold text-red-500">
          <Link to="/">🥘BiteBuddy</Link>
        </div></h1>

        <h3><div className="flex flex-wrap items-center gap-4 text-gray-700 font-medium">
          <Link to="/" className="hover:text-red-500">Home</Link>
          <Link to="/restaurants" className="hover:text-red-500">Restaurants</Link>
          <Link to="/cart" className="hover:text-red-500">Cart</Link>
          <Link to="/orders" className="hover:text-red-500">Orders</Link>

          {!user && !admin ? (
            <Link to="/user/auth" className="text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded-full">
              Log In / Sign Up
            </Link>
          ) : (
            <span
              onClick={handleLogout}
              className="cursor-pointer hover:text-red-500"
            >
              Logout
            </span>
          )}
        </div>
        </h3>
      </div>
    </nav>
  );
}

export default Navbar;



