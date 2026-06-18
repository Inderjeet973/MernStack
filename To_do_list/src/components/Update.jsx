import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
export default function Update() {
    const nav = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const editProfile = async (e) => {

        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/users/update', {
                name,
                email,
                password,
            },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            )
            console.log(res)
            // toast.success(res.data.message);
            // nav('/login')
            Swal.fire({
                title: "Updated Successfully",
                text: "You clicked the button!",
                icon: "success"

            })
            nav('/login')
        }
        catch (err) {
            toast.error(res.data.message);
        }

    }
    return (
        <>
            <div className="auth-container">
                <form action="" className="auth-form"
                    onSubmit={editProfile}>
                    <h2>Update Profile</h2>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input type="text"
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)} />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">
                        Update
                    </button>
                </form>
            </div>
        </>
    )
}