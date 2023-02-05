import { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import styles from './MainNavigation.module.css';
import { IoRocketSharp } from 'react-icons/io5';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { TiTimes } from 'react-icons/ti';

const MainNavigation = () => {
    const navRef = useRef();
    const authCtx = useContext(AuthContext);
    const { isLoggedIn, logout, makeError } = authCtx;

    const showNavbar = () => {
        navRef.current.classList.toggle(styles['nav-toggle']);
    };

    const hideNavbar = () => {
        navRef.current.classList.remove(styles['nav-toggle']);
    };

    const logoutHandler = () => {
        logout();
        hideNavbar();
        makeError(null);
    };

    return (
        <header className={styles.header}>
            <Link to='/' onClick={hideNavbar}>
                <div className={styles.logo}>
                    <span>
                        <IoRocketSharp size={30} />
                    </span>
                    Anywhere App
                </div>
            </Link>
            <nav>
                <ul ref={navRef}>
                    {isLoggedIn && (
                        <li>
                            <button className={styles['nav-btn']}
                                onClick={showNavbar}><TiTimes /></button>
                        </li>
                    )}
                    {!isLoggedIn && (
                        <li>
                            <Link to='/auth'>
                                <span className={styles.underline}>Login</span>
                            </Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <Link to='/profile' onClick={hideNavbar}>
                                <span className={styles.underline}>Profile</span>
                            </Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <button onClick={logoutHandler}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
            {!isLoggedIn && (
                <Link to='/auth' id={styles.login}>
                    <span className={styles.underline}>Login</span>
                </Link>
            )}
            {isLoggedIn && (
                <button className={styles['nav-btn']} onClick={showNavbar}>
                    <HiOutlineBars3 />
                </button>
            )}
        </header >
    );
};

export default MainNavigation;