import { useEffect, useState } from "react"
import axios from "axios"

const review = () => {

    const Star1 = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>)

    const Star2 = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
    </svg>)
    const [reviews, setReviews] = useState([])

    const RatingStars = ({ number }) => {
        const stars = [];
        let i = 0
        for (i = 0; i < number; i++) {
            stars.push(<Star1 key={i} />);
        }

        for (i; i < 5; i++) {
            stars.push(<Star2 key={i} />);
        }


        return <p>{stars}</p>;
    };

    useEffect(() => {
        const getReviews = async () => {
            try {
                const authToken = JSON.parse(sessionStorage.getItem('authToken'))
                const response = await axios.get('https://library-review-microservices.onrender.com/review/', { headers: { Authorization: `Bearer ${authToken.token}` } })
                setReviews(response.data)
            } catch (error) {
                console.log(error.message)
                sessionStorage.clear()
                window.location.href = '/login'
            }
        }

        getReviews()
    }, [])

    return (
        <>
            <div className="album py-5 bg-body-tertiary">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                        {reviews.map((review) => (
                            <div className="col" key={review._id}>
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{review.book}</h5>
                                        <p className="card-text">{review.review}</p>
                                        <RatingStars number={review.rating} />
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}

export default review