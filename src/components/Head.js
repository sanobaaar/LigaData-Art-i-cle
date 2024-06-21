import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap"

const Head = () => {
  return (
    <Navbar className="navbar" bg="light" data-bs-theme="light" sticky="top">
      <Container>
        <Navbar.Brand href="/">Article</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/articles">Articles</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link style={{ paddingLeft: "53rem" }} href="/signup">
            SignUp
          </Nav.Link>
          <Nav.Link href="/login">LogIn</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Head
