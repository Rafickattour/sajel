import React from 'react';

import styles from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
    const { id, label, icon } = props;

    return (
        <div className={styles.control}>
            <label htmlFor={id}>{label}</label>
            <div className={styles.box}>
                {icon}
                <input {...props} ref={ref} />
            </div>
        </div>
    );
});

export default Input;