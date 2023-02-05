import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../UI/Card';
import Input from '../UI/Input';
import LoadingSpinner from '../UI/LoadingSpinner';
import AuthContext from '../../store/auth-context';
import styles from './AuthForm.module.css';
import { FiMail, FiLock } from 'react-icons/fi';

const AuthForm = () => {
    const navigate = useNavigate();

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);
    const { error, isLoading, makeError, makeLoading } = authCtx;

    const switchAuthModeHandler = () => {
        makeError(null);
        setIsLogin((prevState) => !prevState);

        emailInputRef.current.value = null;
        passwordInputRef.current.value = null;
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const enteredEmailIsValid = !!enteredEmail;
        const enteredPasswordIsValid = !!enteredPassword;

        const FormIsValid = enteredEmailIsValid && enteredPasswordIsValid;

        makeError(null);

        if (!FormIsValid) {
            makeError('Empty Field(s)');
            return;
        }

        makeLoading(true);

        let url;
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvRd6w9-mfpGvHrcCxLTSVi3jztUcGhxw';
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvRd6w9-mfpGvHrcCxLTSVi3jztUcGhxw';
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            makeLoading(false);
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(() => {
                    // if (data && data.error && data.error.message) {
                    //     errorMessage = data.error.message;
                    // }

                    throw new Error('Invalid Email or Password');
                });
            }
        }).then((data) => {
            const expirationTime = new Date(
                new Date().getTime() + +data.expiresIn * 1000
            );
            authCtx.login(data.idToken, expirationTime.toISOString());
            navigate('/', { replace: true });
        }).catch((err) => {
            makeError(err.message);
        });
    };

    let card = isLogin && styles['flip-card'];
    let title = isLogin ? 'Login' : 'Sign Up';
    let switchBtn = isLogin ? 'Login' : 'Create Account';
    let switchMode = isLogin
        ? 'Create new account'
        : 'Login with existing account';

    return (
        <Card class={card}>
            <h1>{title}</h1>
            {error && <p className={styles.error}>{error}</p>}
            <form autoComplete='off' onSubmit={submitHandler}>
                <Input
                    id='email'
                    label='Email'
                    icon={<FiMail color='#D9D9D9' size={30} />}
                    type='text'
                    ref={emailInputRef} />
                <Input
                    id='password'
                    label='Password'
                    icon={<FiLock color='#D9D9D9' size={30} />}
                    type='password'
                    ref={passwordInputRef} />
                <div className={styles.actions}>
                    {!isLoading && <button>{switchBtn}</button>}
                    {isLoading && <LoadingSpinner state='Sending Request' />}
                    <span><hr />or<hr /></span>
                    <button
                        type='button'
                        className={styles.toggle}
                        onClick={switchAuthModeHandler}>
                        {switchMode}
                    </button>
                </div>
            </form>
        </Card>
    );
};

export default AuthForm;