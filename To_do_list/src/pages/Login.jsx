import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import '../../src/auth.css'
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    const user = JSON.parse(sessionStorage.getItem("user"));

    const firstLetter = user?.name?.charAt(0).toUpperCase();

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/api/users/login",
                form
            );

            await Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "Welcome !",
                timer: 1500,
                showConfirmButton: false,
            });
            console.log(res);

            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem('user', JSON.stringify(res.data.user))
            navigate("/");
        } catch (err) {
            // alert(err.response?.data?.message || "Login Failed");
            toast.error(err.response?.data?.message || "Login Failed")
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={loginUser}>
                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Login</button>
                <br />
                <hr />
                <GoogleLogin
                    // onSuccess={(credentialResponse)=>{
                    //     console.log(credentialResponse)
                    // }}
                    onSuccess={async (credentialResponse) => {

                        try {

                            const res = await axios.post(
                                "http://localhost:5000/api/users/google-login",
                                {
                                    credential: credentialResponse.credential
                                }
                            );


                            sessionStorage.setItem("token", res.data.token);
                            sessionStorage.setItem('user', res.data.user.name);

                            Swal.fire({
                                icon: "success",
                                title: "Login Successful",
                                timer: 1500,
                                showConfirmButton: false,
                            });

                            navigate("/");

                        } catch (err) {
                            console.log(err);
                        }
                    }}
                    onError={() => {
                        console.log('google error')
                    }} />

                <p>
                    Don't have an account?
                    <Link to="/register"> Register</Link>
                </p>
            </form>
        </div>
    );
}