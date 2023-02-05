import { Fragment, useState, useEffect } from 'react';

import ReviewItem from './ReviewItem';
import styles from './ReviewsList.module.css';

const ReviewsList = (props) => {
    const [toast, setToast] = useState('');
    // const { sendRequest } = useHttp(deleteReview);

    const removeHandler = (id) => {
        // sendRequest(id);
        // props.onRecall();
        setToast(styles.show);
    };

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [toast]);

    return (
        <Fragment>
            <ul className={styles.list}>
                {props.reviews.map((review) => (
                    <ReviewItem key={review.id} {...review}
                        onDelete={() => removeHandler(review.id)} />
                ))}
            </ul>
            <div className={`${styles.toast} ${toast}`}>
                You're not authorized to perform this action!</div>
        </Fragment >
    );
};

export default ReviewsList;