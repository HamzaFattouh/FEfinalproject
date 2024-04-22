import { useContext, useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.Module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShop,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from '../../user';

export default function navbar() {
    const { user, setUser, userToken } = useContext(UserContext);
    const [userBar, setUserBar] = useState(false);
    const toggleUserBar = () => {
        setUserBar(!userBar);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userToken');
    }


    return (
        <header>
            <div className="navbar">
                <div className="contaner">
                    <div className="leftside">
                        <div className="logo">
                            <FontAwesomeIcon icon={faShop} className="logoicon" />
                        </div>
                        <nav>
                            <ol>
                                <li><NavLink className='pageslink' to="/">Home</NavLink></li>
                                <li><NavLink className='pageslink' to="/Products/1">Products</NavLink></li>
                            </ol>
                        </nav>
                    </div>
                    <div className="rightside">
                        <div className="auth">
                            {user ?
                                <button onClick={toggleUserBar}>{user.userName}</button>
                                : <NavLink className="link" to="/Authentication">Login</NavLink>}
                        </div>
                        <div className="burger">
                            <button><img src="assets/img/burger.svg" alt="menu" /></button>
                        </div>
                    </div>
                </div>
                {userBar && (
                    <div className='userBar'>
                        <NavLink className='userlink' onClick={toggleUserBar} to="/Cart">Cart</NavLink>
                        <Link className='logoutbutton' onClick={() => { toggleUserBar(); logout(); }} to="/">Log Out</Link>
                    </div>
                )}
            </div>
        </header>
    )
}
