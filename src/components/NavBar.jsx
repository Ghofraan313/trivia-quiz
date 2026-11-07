import { Link } from 'react-router-dom'
import { Navbar, Container } from 'react-bootstrap'

export default function NavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container style={{ maxWidth: 640 }}>
        <Navbar.Brand as={Link} to="/">Trivia Quiz</Navbar.Brand>
      </Container>
    </Navbar>
  )
}