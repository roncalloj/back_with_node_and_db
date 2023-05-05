import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand navbar-light bg-light">
			<div className="nav navbar-nav">
				<Link to={'/'} className="links">
					<p className="nav-item nav-link active">Home</p>
				</Link>
				<Link to={'/signup'} className="links">
					<p className="nav-item nav-link">Signup</p>
				</Link>
				<Link to={'/login'} className="links">
					<p className="nav-item nav-link">Login</p>
				</Link>
			</div>
		</nav>
	);
};
