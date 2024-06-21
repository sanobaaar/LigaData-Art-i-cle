import React from "react"

const Signup = () => {
  return (
    <>
      <section>
        <div className="container">
          <form className="form-login">
            <h2 style={{ textAlign: "center" }}>Register with us!</h2>
            <label>Name:</label>
            <input type="name" name="name" placeholder="Enter your name" />

            <label>Email:</label>
            <input type="email" name="email" placeholder="Enter your email" />

            <label>Password:</label>
            <input type="password" name="password" placeholder="Enter your password" />

            <button type="submit" value="Submit">
              Submit
            </button>
            <a style={{ textAlign: "center" }} href="/login">
              Already have an account? Log in!
            </a>
          </form>
        </div>
      </section>
    </>
  )
}

export default Signup
