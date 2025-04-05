/*********************************************************************************
*  WEB422 – Assignment 6
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Aksharajsinh Parmar   Student ID: 140204223   Date: [Enter Date]
********************************************************************************/
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { authenticateUser } from '@/lib/authenticate';
import { getFavourites, getHistory } from '@/lib/userData';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const [ , setFavouritesList] = useAtom(favouritesAtom);
  const [ , setSearchHistory] = useAtom(searchHistoryAtom);

  // Function to update the atoms with data from the API
  async function updateAtoms() {
    const favourites = await getFavourites();
    const history = await getHistory();
    setFavouritesList(favourites);
    setSearchHistory(history);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const data = await authenticateUser(userName, password);
      // Update the atoms with favourites and history from API
      await updateAtoms();
      // Redirect to favourites page after successful login
      router.push('/favourites');
    } catch (err) {
      setErrorMsg(err.message || 'Login failed');
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-3 text-center">Login</Card.Title>
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="userName" className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your user name" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
