export const addReview = async (requestData) => {
    const response = await fetch('https://react-base-1b1e1-default-rtdb.firebaseio.com/reviews.json', {
        method: 'POST',
        body: JSON.stringify({ ...requestData }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not add review');
    }

    return null;
};

export const deleteReview = (reviewId) => {
    fetch(`https://react-base-1b1e1-default-rtdb.firebaseio.com/reviews/${reviewId}.json`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
    });

    return null;
};

export const getReviews = async () => {
    const response = await fetch('https://react-base-1b1e1-default-rtdb.firebaseio.com/reviews.json');
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch reviews');
    }

    const transformedReviews = [];

    for (const key in data) {
        const reviewsObj = {
            id: key,
            ...data[key]
        };

        transformedReviews.push(reviewsObj);
    }

    return transformedReviews;
};