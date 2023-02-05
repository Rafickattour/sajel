import { useEffect } from 'react';

import ReviewsList from './ReviewsList';
import ReviewForm from './ReviewForm';
import useHttp from '../../hooks/use-http';
import { getReviews } from '../../lib/api';
import styles from './Reviews.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';

const Reviews = () => {
    const { sendRequest, status, data: loadedReviews, error } = useHttp(getReviews, true);

    useEffect(() => { sendRequest() }, [sendRequest]);

    function recallRequest() {
        [1, 2].forEach(sendRequest);
    };

    let reviews;

    if (status === 'pending') {
        reviews = (
            <div className='centered'>
                <LoadingSpinner state='Loading Data' />
            </div>
        );
    }

    if (error) {
        reviews = <p>{error}</p>
    }

    if (status === 'completed' && loadedReviews && loadedReviews.length > 0) {
        reviews = <ReviewsList reviews={loadedReviews} onRecall={recallRequest} />
    }

    if (status === 'completed' && (!loadedReviews || loadedReviews.length === 0)) {
        reviews = <p>No Reviews were Found!</p>
    }

    // const addReviewHandler = (review) => {
    //     review.id = reviews.length + 1;
    //     setReviews((prevList) => {
    //         return [review, ...prevList];
    //     })
    // };

    // const removeHandler = (id) => {
    //     // const newList = reviewsList.filter(item => item.id !== id);
    //     setList(newList);
    // };

    return (
        <section className={styles.reviews}>
            <ReviewForm onRecall={recallRequest} />
            {reviews}
        </section>
    );
};

export default Reviews;