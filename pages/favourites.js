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
import { favouritesAtom } from '../store';
import ArtworkCard from '@/components/ArtworkCard';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  return (
    <Container className="mt-4">
      <h3 className="mb-4">My Favourites</h3>
      {favouritesList.length === 0 ? (
        <Card className="mt-4">
          <Card.Body>
            <h4>Nothing Here</h4>
            <p>Try adding some new artwork to the list.</p>
          </Card.Body>
        </Card>
      ) : (
        <Row className="gy-4">
          {favouritesList.map((objectID) => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
