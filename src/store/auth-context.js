import React, { useEffect, useReducer, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
    makeError: (fault) => { },
    makeLoading: (status) => { }
});

const authReducer = (state, action) => {
    if (action.type === 'REQUEST') {
        return { ...state, token: action.token };
    }

    if (action.type === 'RESET') {
        return { ...state, token: null };
    }

    if (action.type === 'ERROR') {
        return { ...state, error: action.error };
    }

    if (action.type === 'PENDING') {
        return { ...state, isLoading: action.loading };
    }

    return state;
};

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 3600) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime,
    };
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();

    let initialToken = '';

    if (tokenData) {
        initialToken = tokenData.token;
    }

    const [authState, dispatch] = useReducer(authReducer, {
        token: initialToken,
        error: null,
        isLoading: false
    });

    const userIsLoggedIn = !!authState.token;

    const errorHandler = (fault) => {
        dispatch({ type: 'ERROR', error: fault });
    };

    const loadingHandler = (status) => {
        dispatch({ type: 'PENDING', loading: status });
    };

    const logoutHandler = useCallback(() => {
        dispatch({ type: 'RESET' });
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token, expirationTime) => {
        dispatch({ type: 'REQUEST', token: token });
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);

        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: authState.token,
        error: authState.error,
        isLoggedIn: userIsLoggedIn,
        isLoading: authState.isLoading,
        login: loginHandler,
        logout: logoutHandler,
        makeError: errorHandler,
        makeLoading: loadingHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;