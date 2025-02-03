import { useEffect, useState } from "react"
import axios from "axios"
import './user.css'

const User = () => {

    const [datas, setDatas] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editUser, setEditUser] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            try {
                axios.get('http://localhost:3001/auth/manage')
                    .then((res) => {
                        setDatas(res.data)
                    })
                    .catch((error) => {
                        console.log("Error" + error.message)
                        // sessionStorage.clear()
                        // window.location.href = '/login';
                    })
            } catch (error) {
                console.log(error.message)
            }

        }

        getUser()
    }, [editUser])


    const handelChange = (event) => {
        const { id, value } = event.target
        setEditUser({
            ...editUser,
            [id]: value
        })
    }

    const editClick = (user) => {
        setEditUser(user)
        setIsModalOpen(true)
    }

    const handleClose = () => {
        setEditUser(null)
        setIsModalOpen(false)
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (window.confirm("Are you sure you want to make these changes?")) {
            try {
                const authToken = JSON.parse(sessionStorage.getItem('authToken'))
                await axios.put(`http://localhost:3001/auth/manage/${editUser._id}`, { name: editUser.name, role: editUser.role }, { headers: { 'Authorization': `Bearer ${authToken.token}` } })
            } catch (error) {
                console.log(error.message)
            }
        }
        handleClose()
    }

    return (
        <div className="container m-5" style={{ position: 'absolute' }}>
            <h2 className="mb-4 text-center">Users</h2>
            <div className="d-flex justify-content-center">
                <table className="table table-striped table-hover table-bordered">
                    <thead className="table-light text-center">
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((data) => (
                            <tr className="text-center" key={data._id}>
                                <td>{data.name}</td>
                                <td>{data.role}</td>
                                <td>
                                    <a className={`icon-link icon-link-hover custom ${data.email == sessionStorage.getItem('uId') ? "link-secondary" : "link-warning"}`} style={data.email == sessionStorage.getItem('uId') ? { pointerEvents: "none", textDecoration: "none" } : { textDecoration: 'none' }} onClick={() => editClick(data)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                        </svg> Edit
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit User</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={handleClose}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            defaultValue={editUser?.name}
                                            required
                                            onChange={handelChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="role" className="form-label">
                                            Role
                                        </label>
                                        <select className="form-control" id="role" onChange={handelChange}>
                                            <option value={"user"} selected={editUser?.role == 'user' ? true : false}>User</option>
                                            <option value={"admin"} selected={editUser?.role == 'admin' ? true : false}>Admin</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}

export default User