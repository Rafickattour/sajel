import styles from './LoadingSpinner.module.css';

const LoadingSpinner = (props) => {
    return (
        <div className={styles.loading}>
            <p>{props.state}</p>
            <div className={styles['dot-wave']}>
                <div className={styles['dot-wave__dot']} />
                <div className={styles['dot-wave__dot']} />
                <div className={styles['dot-wave__dot']} />
                <div className={styles['dot-wave__dot']} />
            </div>
        </div>
    );
};

export default LoadingSpinner;