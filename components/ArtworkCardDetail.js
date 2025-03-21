/*********************************************************************************
*  WEB422 – Assignment 5
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Aksharajsinh Parmar   Student ID: 140204223   Date: [Enter Date]
********************************************************************************/
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Error from 'next/error';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);
  
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  // When data or favouritesList changes, update the showAdded state.
  useEffect(() => {
    if (objectID) {
      setShowAdded(favouritesList.includes(objectID));
    }
  }, [favouritesList, objectID]);

  const favouritesClicked = () => {
    if (showAdded) {
      // Remove the artwork from favourites
      setFavouritesList(current => current.filter(fav => fav !== objectID));
      setShowAdded(false);
    } else {
      // Add the artwork to favourites
      setFavouritesList(current => [...current, objectID]);
      setShowAdded(true);
    }
  };

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  const {
    primaryImage,
    title,
    objectDate,
    classification,
    medium,
    artistDisplayName,
    artistWikidata_URL,
    creditLine,
    dimensions
  } = data;

  return (
    <Card className="mb-4">
      {primaryImage && (
        <Card.Img variant="top" src={primaryImage} alt={title || "N/A"} />
      )}
      <Card.Body>
        <Card.Title>{title || "N/A"}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {objectDate || "N/A"}<br />
          <strong>Classification:</strong> {classification || "N/A"}<br />
          <strong>Medium:</strong> {medium || "N/A"}
          <br /><br />
          <strong>Artist:</strong> {artistDisplayName || "N/A"}{' '}
          {artistDisplayName && artistWikidata_URL && (
            <a href={artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>
          )}<br />
          <strong>Credit Line:</strong> {creditLine || "N/A"}<br />
          <strong>Dimensions:</strong> {dimensions || "N/A"}
        </Card.Text>
        <Button 
          variant={showAdded ? "primary" : "outline-primary"} 
          onClick={favouritesClicked}
        >
          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
}
