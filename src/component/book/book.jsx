import axios from "axios"
import { useEffect, useState } from "react"

const book = () => {
    const [books, setbooks] = useState([])
    const [query, setQuery] = useState("")
    const [filter, setFilter] = useState("")

    useEffect(() => {
        const getbooks = async () => {
            const authToken = JSON.parse(sessionStorage.getItem('authToken'))
            axios.get('https://library-book-microservices.onrender.com/books', { headers: { Authorization: `Bearer ${authToken.token}` } })
                .then((res) => { setbooks(res.data) })
                .catch((error) => {
                    console.log("Error" + error.message)
                    sessionStorage.clear()
                    window.location.href = '/login';
                })
        }

        getbooks()

    }, [query, filter])

    const handleSearch = async (event) => {
        event.preventDefault()

        try {
            const authToken = JSON.parse(sessionStorage.getItem('authToken'))

            axios.get('http://localhost:3006/search', {
                headers: { Authorization: `Bearer ${authToken.token}` },
                params: {
                    q: query,
                    type: "book",
                    filter: filter
                }
            })
                .then((res) => {
                    setbooks(res.data)
                })
                .catch((error) => {
                    console.log("Error" + error.message)
                })
        } catch (error) {
            console.log(error.message)
        }

    }

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <form
                        className="d-flex"
                        role="search"
                        onSubmit={handleSearch}
                        style={{ gap: '0.5rem', alignItems: 'center' }}
                    >
                        <div style={{ display: 'flex', flexGrow: 1 }}>
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={(e) => setQuery(e.target.value)}
                                style={{
                                    borderRadius: '0.375rem 0 0 0.375rem',
                                    width: '70%',
                                }}
                            />
                            <select
                                className="form-select"
                                onChange={(e) => setFilter(e.target.value)}
                                style={{
                                    borderRadius: '0 0.375rem 0.375rem 0',
                                    borderLeft: 'none',
                                    width: '30%',
                                }}
                            >
                                <option value="" selected>
                                    Filter
                                </option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Mystery">Mystery</option>
                                <option value="Science Fiction">Science Fiction</option>
                                <option value="Children's Fantasy">Children's Fantasy</option>
                            </select>
                        </div>
                        <button
                            className="btn btn-outline-success"
                            type="submit"
                            style={{ marginLeft: '0.5rem' }}
                        >
                            Search
                        </button>
                    </form>
                </div>
            </nav>

            <div className="album py-5 bg-body-tertiary">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                        {books.map((book) => (
                            <div className="col" key={book._id}>
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{book.title}</h5>
                                        <p className="card-text">By:- {book.author}</p>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">{new Date(book.publishedDate).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "2-digit"
                                        })}</h6>
                                        <p className="card-text">{book.genre}</p>
                                        <a href="#" className="card-link">Card link</a>
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

export default book