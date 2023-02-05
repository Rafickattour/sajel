import styles from './Card.module.css';

const Card = (props) => {
    return (
        <section className={`${styles.card}
        ${props.class}`}>{props.children}</section>
    );
};

export default Card;