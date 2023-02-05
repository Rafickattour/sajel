import { useRef } from 'react';

import useHttp from '../../hooks/use-http';
import { addReview } from '../../lib/api';
import styles from './ReviewForm.module.css';

const ReviewForm = (props) => {
    const reviewInputRef = useRef();
    const { sendRequest, error } = useHttp(addReview);

    const submitHandler = (e) => {
        e.preventDefault();
        const enteredReview = reviewInputRef.current.value;

        const enteredReviewIsValid =
            !!enteredReview &&
            enteredReview.trim().length <= 25;

        if (enteredReviewIsValid) {
            sendRequest({ text: enteredReview });
            props.onRecall();
        } else {
            reviewInputRef.current.focus();
        }
    };

    return (
        <div className={styles.box}>
            {error && <p>{error}</p>}
            <form
                autoComplete='off'
                className={styles.form}
                onSubmit={submitHandler}>
                <input type='text' id='review'
                    ref={reviewInputRef} placeholder='type here!' />
                <div className={styles.action}>
                    <button>Add Review</button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;