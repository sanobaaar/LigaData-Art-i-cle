import React, { useState } from "react"
import { handleError, handleSuccess } from "../utils"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"

const Login = () => {
  const [formData, setFormData] = useState({
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
    const { email, password } = formData
    if (!email || !password) {
      handleError("All fields are required!")
    }

    try {
      const url = "http://localhost:8080/auth/login"
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const result = await response.json()

      const { success, message, jwtToken, name, error } = result
      if (success) {
        handleSuccess(message)
        localStorage.setItem("token", jwtToken)
        localStorage.setItem("loggedInUser", name)
        setTimeout(() => {
          navigate("/")
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
    <div className="container">
      <section>
        <div className="container">
          <form className="form-login" onSubmit={handleSubmit}>
            <h2 style={{ textAlign: "center" }}>Let's Article!</h2>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              value={formData.email}
              required
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              value={formData.password}
              required
            />

            <button type="submit" value="Submit">
              Submit
            </button>
            <span style={{ textAlign: "center" }}>
              Create a new account!
              <a href="/signup">Sign up!</a>
            </span>
          </form>
          <ToastContainer />
        </div>
      </section>
    </div>
  )
}

export default Login
