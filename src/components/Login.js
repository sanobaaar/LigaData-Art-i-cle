import React from "react"

const Login = () => {
  return (
    <>
      <section>
        <div className="container">
          <form className="form-login">
            <h2 style={{ textAlign: "center" }}>Let's Article!</h2>
            <label>Email:</label>
            <input type="email" name="email" placeholder="Enter email" />

            <label>Password:</label>
            <input type="password" name="name" placeholder="Enter password" />

            <button type="submit" value="Submit">
              Submit
            </button>
            <a style={{ textAlign: "center" }} href="/signup">
              Create a new account!
            </a>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login
