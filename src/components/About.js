import React from "react"
import { Link } from "react-router-dom"

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <h2>Who Are We? </h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit, minus doloremque? Hic repellendus autem
          cumque vitae, quaerat dolorum facere, aliquam sint distinctio dolor ex obcaecati aut nam molestiae officia.
          Cumque, nam officia libero cupiditate alias labore, asperiores atque ipsam fuga dignissimos voluptatum.
          Asperiores dolor beatae quod quas delectus aliquam optio!
        </p>
        <br></br>
        <h2>How We Work?</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit, minus doloremque? Hic repellendus autem
          cumque vitae, quaerat dolorum facere, aliquam sint distinctio dolor ex obcaecati aut nam molestiae officia.
          Cumque, nam officia libero cupiditate alias labore, asperiores atque ipsam fuga dignissimos voluptatum.
          Asperiores dolor beatae quod quas delectus aliquam optio!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias doloribus dicta, repellat qui eveniet esse
          maxime odio possimus sed dolorum.
        </p>
        <br></br>
        <Link to={"/articles"}>
          <button>Review our articles!</button>
        </Link>
      </div>
    </section>
  )
}

export default About
