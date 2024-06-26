import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { handleSuccess } from "../utils"
import { useNavigate } from "react-router-dom"

function Head({ isAuthenticated }) {
  const navigate = useNavigate()

  //logs out user and deletes localStorage token
  const logout = e => {
    localStorage.removeItem("token")
    localStorage.removeItem("loggedInUser")
    handleSuccess("User logged out!")
    setTimeout(() => {
      navigate("/")
    }, 1500)
  }
  return (
    <Navbar className="navbar" bg="light" data-bs-theme="light" sticky="top">
      <Container>
        <Navbar.Brand href="/">Article</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/articles">Articles</Nav.Link>
          <Nav.Link href="/about" spy={true} smooth={true} duration={500}>
            About
          </Nav.Link>

          {/* if user is logged in - shows option to logout - ELSE - login */}
          {isAuthenticated ? (
            <Nav.Link className="logged" onClick={logout} href="/">
              Log Out
            </Nav.Link>
          ) : (
            <Nav.Link className="logged" href="/login">
              Log In
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Head
