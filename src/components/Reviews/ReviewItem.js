import styles from './ReviewItem.module.css';
import { MdDelete } from 'react-icons/md';

const ReviewItem = (props) => {
    return (
        <li className={styles.item}>
            <p>{props.text}</p>
            <span>
                <MdDelete size={28} onClick={props.onDelete} />
            </span>
        </li>
    );
};

export default ReviewItem;