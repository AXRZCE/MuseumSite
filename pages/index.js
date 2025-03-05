/*********************************************************************************
*  WEB422 – Assignment 4
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Aksharajsinh Parmar   Student ID: 140204223   Date: [Enter Date]
********************************************************************************/

import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-overlay" />
        <Container className="hero-content">
          <Row className="align-items-center">
            <Col md={7}>
              <h1 className="hero-title">Experience Art in a New Light</h1>
              <p className="hero-description">
                Discover the treasures of the Metropolitan Museum of Art through a modern, interactive lens.
              </p>
              <Link href="/search" passHref legacyBehavior>
                <Button variant="light" size="lg" className="hero-btn">
                  Explore Now
                </Button>
              </Link>
            </Col>
            <Col md={5} className="d-none d-md-block">
              <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" 
                alt="Met Museum" 
                fluid 
                rounded 
                className="hero-image"
              />
            </Col>
          </Row>
          <div className="scroll-down">
            <span className="arrow">&#8595;</span>
          </div>
        </Container>
      </section>

      {/* Main Content Section */}
      <Container className="main-content mt-5">
        <Row>
          <Col md={6}>
            <p>
              The Metropolitan Museum of Art, known as "the Met," is one of the world's largest and most prestigious art museums.
            </p>
          </Col>
          <Col md={6}>
            <p>
              Explore an extensive collection that spans over 5,000 years of art and culture. For detailed information, visit&nbsp;
              <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">
                Wikipedia
              </a>.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
