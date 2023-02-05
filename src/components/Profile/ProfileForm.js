import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../UI/Card';
import Input from '../UI/Input';
import LoadingSpinner from '../UI/LoadingSpinner';
import AuthContext from '../../store/auth-context';
import styles from './ProfileForm.module.css';
import { RiLockPasswordLine } from 'react-icons/ri';

const ProfileForm = () => {
    const navigate = useNavigate();
    const newPasswordInputRef = useRef();

    const authCtx = useContext(AuthContext);

    const { error, isLoading, makeError, makeLoading } = authCtx;

    const submitHandler = (e) => {
        e.preventDefault();

        const enteredNewPassword = newPasswordInputRef.current.value;

        const FormIsValid = !!enteredNewPassword && enteredNewPassword.trim().length >= 6;

        makeError(null);

        if (!FormIsValid) {
            makeError('Password must not be empty and is at least 6 characters long');
            return;
        }

        makeLoading(true);

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCvRd6w9-mfpGvHrcCxLTSVi3jztUcGhxw', {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                password: enteredNewPassword,
                returnSecureToken: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            makeLoading(false);
            navigate('/', { replace: true });
        });
    };

    return (
        <Card>
            {error && <p className={styles.error}>{error}</p>}
            <form className={styles.form} onSubmit={submitHandler}>
                <Input
                    id='new-password'
                    label='New Password'
                    icon={<RiLockPasswordLine color='#D9D9D9' size={30} />}
                    type='password'
                    ref={newPasswordInputRef} />
                <div className={styles.action}>
                    {!isLoading && <button>Change Password</button>}
                    {isLoading && <LoadingSpinner state='Sending Request' />}
                </div>
            </form>
        </Card>
    );
};

export default ProfileForm;