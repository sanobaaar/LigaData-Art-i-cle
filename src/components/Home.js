import React from "react"
import { ToastContainer } from "react-toastify"
import About from "./About"

const Home = ({ loggedInUser }) => {
  return (
    <>
      <section>
        <div className="background-image">
          <div className="home-text">
            {/* if user is logged in, greet user - returns loggedInUser info from localStorage */}
            {loggedInUser ? <h1>Hello {loggedInUser} </h1> : null}

            <h2>Publishing Made Easy! </h2>
            <br></br>
            <h4>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae culpa, perspiciatis aspernatur
              veritatis eveniet aliquam cumque impedit nostrum odio. Voluptatum.
            </h4>
          </div>
        </div>
        <ToastContainer />
      </section>
      <About />
    </>
  )
}

export default Home
