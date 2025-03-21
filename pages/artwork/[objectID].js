/*********************************************************************************
*  WEB422 – Assignment 5
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Aksharajsinh Parmar   Student ID: 140204223   Date: [Enter Date]
********************************************************************************/
import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';

export default function ArtworkById() {
  const router = useRouter();
  const { objectID } = router.query;

  // If the objectID is not yet available (during SSR or first render), return null
  if (!objectID) return null;

  return (
    <Row className="mt-4">
      <Col>
        <ArtworkCardDetail objectID={objectID} />
      </Col>
    </Row>
  );
}
