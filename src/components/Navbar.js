import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ showAlert }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    showAlert('Logged out successfully', 'success');
    // Redirect to login page
    navigate('/login', { replace: true }); // Use replace to avoid adding to history stack
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid d-flex">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
            </li>
          </ul>
          <form className="d-flex">
            {!token ? (
              <>
                <Link className="btn btn-primary mx-2" to='/login' role="button">Login</Link>
                <Link className="btn btn-primary mx-2" to='/signup' role="button">Sign Up</Link>
              </>
            ) : (
              <button className="btn btn-danger mx-2" onClick={handleLogout}>Logout</button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
