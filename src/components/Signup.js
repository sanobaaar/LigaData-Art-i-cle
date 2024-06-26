import React, { useState } from "react"
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from "../utils"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    console.log(name, value)
    const copyFormData = { ...formData }
    copyFormData[name] = value
    setFormData(copyFormData)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { firstName, lastName, email, password } = formData
    if (!firstName || !email || !password) {
      handleError("All fields are required!")
    }

    try {
      const url = "http://localhost:8080/auth/signup"
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      const { success, message, error } = result
      if (success) {
        handleSuccess(message)
        setTimeout(() => {
          navigate("/login")
        }, 2000)
      } else if (error) {
        const details = error?.details[0].message
        handleError(details)
      } else if (!success) {
        handleError(message)
      }
      console.log(result)
    } catch (err) {
      return handleError(err)
    }
  }

  return (
    <>
      <section>
        <div className="container">
          <form className="form-login" onSubmit={handleSubmit}>
            <h2 style={{ textAlign: "center" }}>Register with us!</h2>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              onChange={handleChange}
              value={formData.firstName}
              required
            />

            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              onChange={handleChange}
              value={formData.lastName}
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={formData.email}
              autoComplete="off"
              required
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={formData.password}
              required
            />

            <button type="submit">Create Account</button>
            <strong style={{ textAlign: "center" }}>
              Already have an account?
              <a href="/login"> Log in!</a>
            </strong>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  )
}

export default Signup
