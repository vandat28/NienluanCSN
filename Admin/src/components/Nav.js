import React from 'react';
import { NavLink, Link } from 'react-router-dom';


export default function Nav() {


    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <Link className="navbar-brand ps-3" to="/">
                <img src='/img/ChiLiSkiLogo-removebg-preview.png' />
                Admin
            </Link>
            <div className="navbar-nav">
                <NavLink className="nav-link me-2" to="/loai">
                    <i className="fa fa-bookmark me-2" aria-hidden="true"></i>
                    Khóa học
                </NavLink>
                <NavLink className="nav-link me-2" to="/khoahoc">
                    <i className="fa fa-database me-2" aria-hidden="true"></i>
                    Bài học
                </NavLink>
            </div>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                </div>
            </form>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#!">Settings</a></li>
                        <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#!">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>

    );
}