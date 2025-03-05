/*********************************************************************************
*  WEB422 – Assignment 4
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Aksharajsinh Parmar   Student ID: 140204223   Date: [Enter Date]
********************************************************************************/
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Row, Col, Container, Pagination, Card, Spinner } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import Error from 'next/error';

const PER_PAGE = 12;

export default function Artwork() {
  const router = useRouter();
  // Extract the query string from the URL (everything after '?')
  let finalQuery = router.asPath.split('?')[1] || '';
  
  // Use SWR to fetch artwork IDs from the Met Museum API
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (data && data.objectIDs) {
      let results = [];
      // Create a 2D array (pages) by chunking objectIDs into groups of PER_PAGE
      for (let i = 0; i < data.objectIDs.length; i += PER_PAGE) {
        const chunk = data.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  const previousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    if (artworkList && page < artworkList.length) setPage(page + 1);
  };

  if (error) return <Error statusCode={404} />;
  if (!data) return <Spinner animation="border" className="d-block mx-auto mt-3" />;

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Artwork Search Results</h3>
      {artworkList && artworkList.length > 0 ? (
        <>
          <Row className="gy-4">
            {artworkList[page - 1].map((objectID) => (
              <Col lg={3} key={objectID}>
                <ArtworkCard objectID={objectID} />
              </Col>
            ))}
          </Row>
          <Row className="mt-4">
            <Col className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev onClick={previousPage} disabled={page <= 1} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} disabled={page === artworkList.length} />
              </Pagination>
            </Col>
          </Row>
        </>
      ) : (
        <Card className="mt-4">
          <Card.Body>
            <h4>Nothing Here</h4>
            <p>Try searching for something else.</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
