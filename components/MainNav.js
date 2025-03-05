/*********************************************************************************
*  WEB422 – Assignment 4
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Aksharajsinh Parmar   Student ID: 140204223   Date: [Enter Date]
********************************************************************************/
// components/MainNav.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';

export default function MainNav() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      // Redirect to /artwork with the query parameters (title=true, q=...)
      router.push(`/artwork?title=true&q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="fixed-top">
      <Container>
        <Navbar.Brand>Aksharajsinh Parmar</Navbar.Brand>
        <Nav className="me-auto">
          <Link href="/" passHref legacyBehavior>
            <Nav.Link>Home</Nav.Link>
          </Link>
          <Link href="/search" passHref legacyBehavior>
            <Nav.Link>Advanced Search</Nav.Link>
          </Link>
        </Nav>
        <Form className="d-flex" onSubmit={handleSubmit}>
          <FormControl
            type="search"
            placeholder="Search Artwork"
            className="me-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-light" type="submit">🔍</Button>
        </Form>
      </Container>
    </Navbar>
  );
}
