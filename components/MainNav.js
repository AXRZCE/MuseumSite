/*********************************************************************************
*  WEB422 – Assignment 5
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Aksharajsinh Parmar   Student ID: 140204223   Date: [Enter Date]
********************************************************************************/
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

export default function MainNav() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [_, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Collapse navbar on submit
    setIsExpanded(false);
    if (searchTerm.trim() !== '') {
      const queryString = `title=true&q=${encodeURIComponent(searchTerm)}`;
      // Add the query string to the search history atom
      setSearchHistory(current => [...current, queryString]);
      // Navigate to artwork page with the query string
      router.push(`/artwork?${queryString}`);
    }
  };

  // Function to collapse navbar on link click
  const handleLinkClick = () => {
    setIsExpanded(false);
  };

  return (
    <Navbar 
      bg="primary" 
      variant="dark" 
      expand="lg" 
      className="fixed-top" 
      expanded={isExpanded}
    >
      <Container>
        <Navbar.Brand>Aksharajsinh Parmar</Navbar.Brand>
        <Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link onClick={handleLinkClick} active={router.pathname === "/"}>
                Home
              </Nav.Link>
            </Link>
            <Link href="/search" passHref legacyBehavior>
              <Nav.Link onClick={handleLinkClick} active={router.pathname === "/search"}>
                Advanced Search
              </Nav.Link>
            </Link>
          </Nav>
          {/* User Dropdown for Favourites and Search History */}
          <Nav>
            <NavDropdown title="User Name" id="user-nav-dropdown">
              <Link href="/favourites" passHref legacyBehavior>
                <NavDropdown.Item onClick={handleLinkClick} active={router.pathname === "/favourites"}>
                  Favourites
                </NavDropdown.Item>
              </Link>
              <Link href="/history" passHref legacyBehavior>
                <NavDropdown.Item onClick={handleLinkClick} active={router.pathname === "/history"}>
                  Search History
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
