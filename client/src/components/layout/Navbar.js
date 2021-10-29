import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


//destructured props 
const Navbar = ({ title, icon}) => {
    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} />
                {title}
            </h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
            
        </div>
    )
}

//check props type
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

//props default vals
Navbar.defaultProps = {
    title: "Contact Keeper",
    icon: "fas fa-id-card-alt"
}

export default Navbar