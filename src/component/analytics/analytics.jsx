import { useEffect, useState } from "react"
import axios from "axios"
import Radar from "./radarGraph";
import Bar from "./barGraph";

const analytic = () => {
    const [topBook, setTopBook] = useState([])



    useEffect(() => {
        const getTopbooks = async () => {
            try {
                const authToken = JSON.parse(sessionStorage.getItem('authToken'))
                const response = await axios.get('https://library-analytics-microservices.onrender.com/analytics/topBook', { headers: { Authorization: `Bearer ${authToken.token}` } })
                setTopBook(response.data)
            } catch (error) {
                console.log(error.message)
            }
        }

        getTopbooks()

    }, [])


    return (
        <>
            <div className="p-5 mb-4 bg-body-secondary rounded-3">
                <h2>Top Rviewed Books</h2>
                <div className="container-fluid py-5">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {
                            topBook.map((book) => (
                                <div className="col" key={book.book}>
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title">{book.book}</h5>
                                            <p className="card-text">Total Rating {book.totalReviews}</p>
                                            <p className="card-text">Average Rating:- {book.avgRating}</p>
                                            <a href="#" className="card-link">Card link</a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div >



            <div className="row align-items-md-stretch">
                <div className="col-md-6">
                    <Radar />
                </div>

                <div className="col-md-6">
                    <Bar />
                </div>
            </div>


        </>
    )
}

export default analytic