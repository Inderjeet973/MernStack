import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/",
        form
      );
      await Swal.fire({
                icon: "success",
                title: "Register Successful",
                text: "Welcome back!",
                timer: 1500,
                showConfirmButton: false,
            });
    //   alert(res.data.message);
      navigate("/login");
    } catch (err) {
        console.log(err)
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={registerUser}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

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

        <button type="submit">Register</button>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </form>
    </div>
  );
}