import React from "react"
import Login from "./Login"
import { Button } from "react-bootstrap"

const Home = () => {
  return (
    <>
      <section>
        <div className="background-image">
          <div className="home-text">
            <h1>Publishing Made Easy!</h1>
            <h3>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum quaerat quidem sequi autem, ut possimus
              doloribus alias minima ad soluta accusamus at aut laboriosam ex maxime. Ratione eaque quaerat, hic
              laudantium obcaecati distinctio delectus, asperiores sapiente dignissimos similique culpa vel deleniti!
              Laboriosam non eius deserunt. Vero excepturi quaerat neque minus?
            </h3>
            <br></br>
            <Button variant="success">Get Started!</Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
