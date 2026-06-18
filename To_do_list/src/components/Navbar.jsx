import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Update from "./Update";

export default function Navbar() {
    const navigate = useNavigate()
    const [showmenu, setShowMenu] = useState(false);
    const user = JSON.parse(sessionStorage.getItem('user'))

    const nav = useNavigate('/update')
    const firstLetter = user.name.charAt(0).toUpperCase()

    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user')
        navigate('/login');
    };
    const updateProfile = ()=>{
        
    }
   
    return (
        <>
            <div className="navbar">
                <h2>Todo App</h2>
                <div className="profile-container">
                    <div
                        className="profile"
                        onClick={() => setShowMenu(!showmenu)}
                    >{firstLetter}

                    </div>
                    {showmenu && (
                        <div className="dropdown">
                            <p>Name:{user.name}</p>
                            <p>Email:{user.email}</p>
                            <button onClick={logout}>
                                Logout
                            </button>
                           <Link to={'/update'}>
                           <button>Update Profile</button></Link>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}