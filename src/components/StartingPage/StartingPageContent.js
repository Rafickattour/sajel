import { useContext } from 'react';

import Reviews from '../Reviews/Reviews';
import AuthContext from '../../store/auth-context';
import styles from './StartingPageContent.module.css';

const StartingPageContent = () => {
    const authCtx = useContext(AuthContext);

    const { isLoggedIn } = authCtx;

    return (
        <section className={styles.starting}>
            <h1>{isLoggedIn ? 'Welcome User'
                : 'Welcome on Board!'}</h1>
            {isLoggedIn && <Reviews />}
        </section>
    );
};

export default StartingPageContent;