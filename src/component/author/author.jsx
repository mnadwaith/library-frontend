import axios from "axios"
import { useEffect, useState } from "react"

const author = () => {
    const [authors, setAuthors] = useState([])
    const [query, setQuery] = useState("")

    useEffect(() => {
        const getAuthors = async () => {
            const authToken = JSON.parse(sessionStorage.getItem('authToken'))
            axios.get('https://library-author-microservices.onrender.com/authors', { headers: { Authorization: `Bearer ${authToken.token}` } })
                .then((res) => { setAuthors(res.data) })
                .catch((error) => {
                    console.log("Error" + error.message)
                    sessionStorage.clear()
                    window.location.href = '/login';
                })
        }

        getAuthors()
    }, [query])

    const handleSearch = async (event) => {
        event.preventDefault()

        try {
            const authToken = JSON.parse(sessionStorage.getItem('authToken'))

            axios.get('http://localhost:3006/search', {
                headers: { Authorization: `Bearer ${authToken.token}` },
                params: {
                    q: query,
                    type: "author"
                }
            })
                .then((res) => { setAuthors(res.data) })
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
                    <form className="d-flex" role="search" onSubmit={handleSearch}>
                        <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" onChange={(e) => setQuery(e.target.value)} />
                        <button className="btn btn-outline-success" type="submit"   >Search</button>
                    </form>
                </div>
            </nav>
            <div className="album py-5 bg-body-tertiary">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                        {authors.map((author) => (
                            <div className="col" key={author._id}>
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{author.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">{new Date(author.dateOfBirth).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "2-digit"
                                        })}</h6>
                                        <p className="card-text">{author.bio}</p>
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

export default author