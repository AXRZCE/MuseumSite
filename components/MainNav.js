/*********************************************************************************
*  WEB422 – Assignment 6
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
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [_, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  // Read the token from localStorage
  const token = readToken();
  // Decode the token to get the userName (using a simple base64 decode approach)
  let userName = "";
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userName = payload.userName || "User";
    } catch (err) {
      console.error("Error decoding token:", err);
      userName = "User";
    }
  }

  // Logout function: collapse navbar, remove token, and redirect to /login
  const logout = () => {
    setIsExpanded(false);
    removeToken();
    router.push('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsExpanded(false);
    if (searchTerm.trim() !== '') {
      const queryString = `title=true&q=${encodeURIComponent(searchTerm)}`;
      // Persist search history via API call and update the atom
      const updatedHistory = await addToHistory(queryString);
      setSearchHistory(updatedHistory);
      router.push(`/artwork?${queryString}`);
    }
  };

  // Function to collapse navbar on link click
  const handleLinkClick = () => {
    setIsExpanded(false);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="fixed-top" expanded={isExpanded}>
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
            {token && (
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link onClick={handleLinkClick} active={router.pathname === "/search"}>
                  Advanced Search
                </Nav.Link>
              </Link>
            )}
          </Nav>
          {token ? (
            <>
              {/* User Dropdown for Logged-In Users */}
              <Nav>
                <NavDropdown title={userName} id="user-nav-dropdown">
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
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              {/* Search Form visible for logged-in users */}
              <Form className="d-flex" onSubmit={handleSubmit}>
                <FormControl
                  type="search"
                  placeholder="Search Artwork"
                  className="me-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-light" type="submit">
                  🔍
                </Button>
              </Form>
            </>
          ) : (
            // If not logged in, show Register and Login links
            <Nav>
              <Link href="/register" passHref legacyBehavior>
                <Nav.Link onClick={handleLinkClick} active={router.pathname === "/register"}>
                  Register
                </Nav.Link>
              </Link>
              <Link href="/login" passHref legacyBehavior>
                <Nav.Link onClick={handleLinkClick} active={router.pathname === "/login"}>
                  Login
                </Nav.Link>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
