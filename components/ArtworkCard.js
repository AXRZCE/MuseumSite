/*********************************************************************************
*  WEB422 – Assignment 6
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Aksharajsinh Parmar   Student ID: 140204223   Date: [Enter Date]
********************************************************************************/
import useSWR from 'swr';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import Error from 'next/error';

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  const {
    primaryImageSmall,
    title,
    objectDate,
    classification,
    medium,
  } = data;

  return (
    <Card className="mb-4">
      <Card.Img
        variant="top"
        src={primaryImageSmall || "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"}
        alt={title || "N/A"}
      />
      <Card.Body>
        <Card.Title>{title || "N/A"}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {objectDate || "N/A"}<br />
          <strong>Classification:</strong> {classification || "N/A"}<br />
          <strong>Medium:</strong> {medium || "N/A"}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
          <Button variant="primary">{objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
