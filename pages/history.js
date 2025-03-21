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
import { useRouter } from 'next/router';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  // Parse each stored query string into an object
  const parsedHistory = searchHistory.map(queryString => {
    const params = new URLSearchParams(queryString);
    return Object.fromEntries(params.entries());
  });

  // Navigate to /artwork with the stored query string when an item is clicked
  const historyClicked = (queryString) => {
    router.push(`/artwork?${queryString}`);
  };

  // Remove a history item by index and stop the click event propagation
  const removeHistoryClicked = (e, index) => {
    e.stopPropagation();
    setSearchHistory(current => {
      const updated = [...current];
      updated.splice(index, 1);
      return updated;
    });
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Search History</h3>
      {parsedHistory.length === 0 ? (
        <Card className="mt-4">
          <Card.Body>
            <h4>Nothing Here</h4>
            <p>Try searching for some artwork.</p>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {searchHistory.map((queryString, index) => {
            const historyItem = parsedHistory[index];
            return (
              <ListGroup.Item 
                key={index} 
                className={styles.historyListItem} 
                onClick={() => historyClicked(queryString)}
              >
                {Object.keys(historyItem).map((key, i) => (
                  <span key={i}>
                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                  </span>
                ))}
                <Button 
                  variant="danger" 
                  size="sm" 
                  className="float-end" 
                  onClick={(e) => removeHistoryClicked(e, index)}
                >
                  &times;
                </Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </Container>
  );
}
