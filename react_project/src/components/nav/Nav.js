import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images.png';
import { Link } from 'react-router-dom';



const Nav = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('LoggedUserID');
  const logout = () => {
    localStorage.removeItem("LoggedUserID");
    navigate("/Login");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-transparent p-3">
        <div className="container">
          <Link
            className="d-flex navbar-brand text-white flex-grow-1"
            to="/"
            style={{ textDecoration: 'none', color: '#d51c9a' }}
          >
            <img
              src={logo}
              alt="Logo"
              width="30"
              height="30"
              className="d-inline-block align-text-top me-3"
              onClick={() => navigate('/')}
            />
            Contact Management
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="sidebar offcanvas offcanvas-end"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title text-white" id="offcanvasNavbarLabel">
                Offcanvas
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"> 
              </button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav d-flex justify-content-evenly flex-grow-1 pe-3">
                <li className="nav-item">
                  <span className="nav-link text-white" href="#">
                    Contact Here
                  </span>
                </li>
                <li className="nav-item">
                  <span className="nav-link text-white">LetsBegin!</span>
                </li>
                {user ? (
                  // Render logout button when user is logged in
                  <button
                    className="btn btn-outline-light"
                    onClick={() => logout()}
                  // Handle logout logic here 
                  >
                    Logout
                  </button>
                ) : (
                  // Render register and login buttons when user is not logged in
                  <>
                    <Link className="nav-button p-2 text-decoration-none" to="/Register">
                      Register
                    </Link>
                    <Link className="nav-button p-2 text-decoration-none" to="/Login">
                      Login
                    </Link>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
